import CurrencyConverter from "./components/ccrequest";

export default function Home() {
  return (
    <div className="items-center justify-items-center gap-16 p-3 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-8 mb-20 pt-5 items-center sm:items-start">
        
        <div className="container max-w-2xl">
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row w-full justify-center gap-2">
                    <h1 className="text-2xl mb-2">Currency Converter</h1>
              </div>
              <CurrencyConverter />

            </div>
          </div>
        
        </div>
        
      </main>
      <footer className="flex flex-col w-full max-w-4xl">
        <div className="grid grid-rows-2 gap-5 sm:flex w-full">
          <span className="w-full text-sm text-center row-start-1 sm:text-start">© Currency Converter 2025. All rights reserved</span>
          <span className="w-full text-sm text-center row-start-2 sm:text-end">Forex Data sourced from <a className="underline" href="https://fxratesapi.com" target="_blank">FXRatesAPI</a>.</span>
       </div>
      </footer>
    </div>
    
  );
}
