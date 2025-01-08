import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { projectsList}  from "../../config/projectsList";

class SIPCalculator {
  constructor(sipAmount, returnRate, timePeriod, inflationRate) {
    // from user
    this.sipAmount = parseFloat(sipAmount);
    this.returnRate = parseFloat(returnRate);
    this.timePeriod = parseFloat(timePeriod);
    this.inflationRate = parseFloat(inflationRate);

    // internal
    this.months = this.timePeriod * 12;
    this.monthsData = [];
    this.process();
  }

  process() {
    this.monthsData = [];
    this.investment = 0;
    this.returns = 0;
    this.currentValue = 0;

    for(let i = this.months; i >= 1; --i) {
      const timeInvested = (i / 12.0);
      const returnPercentage = ((this.returnRate - this.inflationRate)/100);
      const totalValue = this.sipAmount * ((1 + returnPercentage) ** timeInvested);

      this.monthsData.push({
        month: (this.months - i + 1),
        investment: this.toHumanReadable((this.sipAmount || 0).toFixed(0)),
        value: this.toHumanReadable((totalValue || 0).toFixed(0)),
        returns: this.toHumanReadable(((totalValue - this.sipAmount) || 0).toFixed(0))
      });

      this.investment = this.investment + this.sipAmount;
      this.currentValue = this.currentValue + totalValue;
    }

    this.returns = this.currentValue - this.investment;
  }

  toHumanReadable(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  get totalInvestment() {
    return this.toHumanReadable((this.investment || 0).toFixed(0));
  }

  get estimatedReturns() {
    return this.toHumanReadable((this.returns || 0).toFixed(0));
  }

  get totalValue() {
    return this.toHumanReadable((this.currentValue || 0).toFixed(0));
  }

  get monthWiseData() {
    return this.monthsData;
  }

}

const getMetaData = () => {
  return projectsList.filter((p) => p.id === 'sip-calculator')[0] || {};
}

const createTableRowForMonth = (monthData) => {
  const styles = monthData.month % 2 == 1 ? "bg-gray-800" : "";

  return (
    <tr key={monthData.month} className={styles}>
      <td>{monthData.month}</td>
      <td>{monthData.investment}</td>
      <td>{monthData.returns}</td>
      <td>{monthData.value}</td>
    </tr>
  );
}

export default function Home() {
  const [sipAmount, setSipAmount] = useState(5000),
  [returnRate, setReturnRate] = useState(12),
  [timePeriod, setTimePeriod] = useState(10),
  [inflationRate, setInflationRate] = useState(5);

  const calc = new SIPCalculator(sipAmount, returnRate, timePeriod, inflationRate);
  const meta = getMetaData();

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={ meta.title } />
        <meta name="description" content={ meta.description } />

        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
        <meta property="og:image" content={ meta.imageUrl } />
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/projects/sip-calculator` } />
        <meta property="og:site_name" content={ DEFAULT_CONFIG.siteTitle } />

        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={ meta.date } />
        <meta property="article:author" content={ meta.author } />
        <meta property="article:tag" content={ meta.tags } />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ meta.title } />
        <meta name="twitter:description" content={ meta.description } />
        { 
          //<meta name="twitter:site" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } /> 
        }
        <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } />
        <meta name="twitter:image" content={ meta.imageUrl } />
        <meta name="twitter:image:alt" content={ meta.title } />
        <meta name="twitter:label1" value="Reading time" />
        <meta name="twitter:data1" value={ `${meta.readingTime} min read` } />
      </Head>
      <article>
        <h2 className={utilStyles.headingLg}>Systematic Investment Plan Calculator</h2>

        <h3 className="pt-8">Calculator</h3>

        <div className="pt-10">
          This is my capsule sized financial advice on investments:
          <ol>
            <li>Compounding is powerful</li>
            <li>Start small</li>
            <li>Start now</li>
            <li>Read about Systematic Investment Plans</li>
            <li>
              Comprehensive reading material on &nbsp;
                <Link href="https://zerodha.com/varsity/module/personalfinance/" target="_blank">personal finance</Link>
            </li>
          </ol>
        </div>
        
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none gap-8 mt-10">

          <div className="flex flex-col space-y-4">

            <div>
              <label className="block">Monthly Investment Amount</label>
              <input type="number" value={sipAmount}
                className="px-2 py-1 rounded text-gray-900 text-lg"
                onChange={(e) => { setSipAmount(e.target.value); }} />
            </div>

            <div>
              <label className="block">Estimated Yearly Return (%)</label>
              <input type="number" value={returnRate} 
                className="px-2 py-1 rounded text-gray-900 text-lg"
                onChange={(e) => { setReturnRate(e.target.value); }} />
            </div>

            <div>
              <label className="block">Time Period (in Years)</label>
              <input type="number" value={timePeriod} 
                className="px-2 py-1 rounded text-gray-900 text-lg"
                onChange={(e) => { setTimePeriod(e.target.value); }} />
            </div>

            <div>
              <label className="block">Inflation Rate (%)</label>
              <input type="number" value={inflationRate} 
                className="px-2 py-1 rounded text-gray-900 text-lg" 
                onChange={(e) => { setInflationRate(e.target.value); }} />
            </div>

            <div className="pt-6">
              <button className="focus:outline-none text-sm w-24 py-3 rounded-md font-semibold text-white bg-blue-500 ring-2">Submit</button>
            </div>
          </div>


          <div className="grid grid-rows-3 gap-4">
            
            <div className="col-span-1 bg-gray-900 border border-gray-800 rounded p-4">
              <div className="text-3xl text-gray-600">Rs. {calc.totalInvestment}</div>
              <div>Total Investment</div>
            </div>
            
            <div className="col-span-1 bg-gray-900 border border-gray-800 rounded p-4">
              <div className="text-3xl text-gray-600">Rs. {calc.estimatedReturns}</div>
              <div>Estimated Returns</div>
            </div>
            
            <div className="col-span-1 bg-gray-900 border border-gray-800 rounded p-4">
              <div className="text-3xl text-gray-600">Rs. {calc.totalValue}</div>
              <div>Total Value</div>
            </div>
          </div>

        </div>

        <h3 className="pt-10">Monthly Breakdown</h3>

        <div className="monthly-breakdown pt-4">
          <table className="table-auto border-collapse border border-blue-800 w-full">
            <thead>
              <tr>
                <th className="w-1/4 px-4 py-2 text-blue-600">month</th>
                <th className="w-1/4 px-4 py-2 text-blue-600">investment</th>
                <th className="w-1/4 px-4 py-2 text-blue-600">returns</th>
                <th className="w-1/4 px-4 py-2 text-blue-600">value</th>
              </tr>
            </thead>
            <tbody className="text-center text-blue-400 font-medium">
              {calc.monthWiseData.map(createTableRowForMonth)}
            </tbody>
          </table>
        </div>

      </article>
    </Layout>
  );
}
