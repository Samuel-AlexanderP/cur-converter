"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import { currencyNameMapping } from './curNameMapping';

interface RatesResponse {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

const CurrencyConverter: React.FC = () => {
    // State to hold the fetched rates and conversion parameters
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    // Holds what the user types (may be an empty string)
    const [amountInput, setAmountInput] = useState<string>("1");
    // Holds the last valid numeric value
    const [lastValidAmount, setLastValidAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("PHP");
    // Store the conversion result here (computed from lastValidAmount)
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch exchange rates once on component mount
    useEffect(() => {
        const fetchRates = async () => {
            const response = await fetch('https://api.fxratesapi.com/latest');
            if (!response.ok) {
            throw new Error(`Error fetching rates: ${response.statusText}`);
            }
            const data: RatesResponse = await response.json();
            setRates(data.rates);
            setLoading(false);
        };

        fetchRates();
    }, []);

    // Update converted amount when inputs or rates change
    useEffect(() => {
        if (rates && rates[fromCurrency] && rates[toCurrency]) {
        // convert the "from" amount to the base, then to the "to" currency.
        const baseAmount = lastValidAmount  / rates[fromCurrency];
        const newConvertedAmount = baseAmount * rates[toCurrency];
        setConvertedAmount(newConvertedAmount);
        }
    }, [lastValidAmount , fromCurrency, toCurrency, rates]);

    // Handle changes in the amount input
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmountInput(value);
    
        // If the input is not blank and parses to a number, update lastValidAmount
        if (value.trim() !== "" && !isNaN(parseFloat(value))) {
          setLastValidAmount(parseFloat(value));
        }
        // Otherwise, do not update lastValidAmount (keeping the previous valid value)
      };

    // Handles the 'from' currency change
    const handleFromCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(e.target.value);
    };

    // Handles the 'to' currency change
    const handleToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(e.target.value);
    };

    if (loading) return <p>Loading rates...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='justify-center items-center' >
            <div>
                <p className='txtborder items-center text-center h-auto font-bold text-2xl'>
                {`${lastValidAmount} ${fromCurrency} = ${
                    convertedAmount !== null ? convertedAmount.toFixed(3) : ""
                } ${toCurrency}`}
                </p>
            </div>
            <div className=''>
                <div className='grid columns-2'>
                    <label className='justify-center col-start-1'>
                    Amount:
                    </label>
                    <input 
                        className='txtborder w-full'
                        type="number" 
                        value={amountInput} 
                        onChange={handleAmountChange} 
                        min="0"
                        step="any"
                    />
                    
                </div>
                <div className='grid columns-2'>
                    <label className='justify-center col-start-1'>
                    From:
                    </label>
                    <select 
                        className='txtborder w-full'
                        value={fromCurrency} onChange={handleFromCurrencyChange}>
                        
                        {Object.keys(rates).map((currency) => {
                            const friendlyName = currencyNameMapping[currency] || currency;
                            return (
                            <option key={currency} value={currency}>
                                {currency} – {friendlyName}
                            </option>
                            );
                        })}
                    </select>
                    
                </div>
                <div className='grid columns-2'>
                    <label className='justify-center col-start-1'>
                    To:
                    </label>
                    <select 
                        className='txtborder w-full'
                        value={toCurrency} onChange={handleToCurrencyChange}>
                        {Object.keys(rates).map((currency) => {
                            const friendlyName = currencyNameMapping[currency] || currency;
                            return (
                            <option key={currency} value={currency}>
                                {currency} – {friendlyName}
                            </option>
                            );
                        })}
                    </select>
                    
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;