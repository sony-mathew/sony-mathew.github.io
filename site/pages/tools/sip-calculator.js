import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import DEFAULT_CONFIG from '../../config/default_config';
import Layout from "../../components/layout";
import ToolPageHeader from "../../components/tool_page_header";
import { projectsList}  from "../../config/projectsList";
import styles from "../../styles/sip-calculator.module.scss";

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

  // Add helper method to get month/year for a given month index
  getMonthYear(monthIndex) {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthIndex, 1);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
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
      const monthIndex = this.months - i + 1;

      this.monthsData.push({
        month: monthIndex,
        monthYear: this.getMonthYear(monthIndex),
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
  const rowClassName = monthData.month % 2 === 1 ? styles.alternateRow : "";

  return (
    <tr key={monthData.month} className={rowClassName}>
      <td>{monthData.month}</td>
      <td>{monthData.monthYear}</td>
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
        <meta property="og:url" content={ `${DEFAULT_CONFIG.baseUrl}/tools/sip-calculator` } />
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
      </Head>
      <article className={styles.page}>
        <ToolPageHeader id="sip-calculator" />
        <div className={styles.advice}>
          This is my capsule-sized financial advice on investments: compounding
          is powerful, start small, and start now. Also read about SIPs
          (Systematic Investment Plans) in this guide to{" "}
          <Link
            href="https://zerodha.com/varsity/module/personalfinance/"
            target="_blank"
            rel="noreferrer"
          >
            personal finance
          </Link>
          .
        </div>

        <div className={styles.calculatorGrid}>
          <section className={styles.inputPanel} aria-labelledby="investment-details-title">
            <div className={styles.panelHeading}>
              <div>
                <h2 id="investment-details-title">Investment details</h2>
                <p>Results update instantly as you change the values.</p>
              </div>
              <span className={styles.liveBadge}>Live</span>
            </div>

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="sip-amount">Monthly investment</label>
                <div className={styles.inputWithPrefix}>
                  <span aria-hidden="true">₹</span>
                  <input
                    id="sip-amount"
                    type="number"
                    min="0"
                    value={sipAmount}
                    onChange={(e) => { setSipAmount(e.target.value); }}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="sip-return-rate">Yearly return</label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="sip-return-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={returnRate}
                    onChange={(e) => { setReturnRate(e.target.value); }}
                  />
                  <span aria-hidden="true">%</span>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="sip-time-period">Time period</label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="sip-time-period"
                    type="number"
                    min="1"
                    max="100"
                    value={timePeriod}
                    onChange={(e) => { setTimePeriod(e.target.value); }}
                  />
                  <span aria-hidden="true">years</span>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="sip-inflation-rate">Inflation rate</label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="sip-inflation-rate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => { setInflationRate(e.target.value); }}
                  />
                  <span aria-hidden="true">%</span>
                </div>
              </div>
            </div>
          </section>

          <dl className={styles.resultsGrid} aria-label="Investment projection">
            <div className={styles.resultCard}>
              <dt>Total investment</dt>
              <dd>₹{calc.totalInvestment}</dd>
            </div>

            <div className={styles.resultCard}>
              <dt>Estimated returns</dt>
              <dd>₹{calc.estimatedReturns}</dd>
            </div>

            <div className={styles.resultCard}>
              <dt>Total value</dt>
              <dd>₹{calc.totalValue}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.breakdownHeading}>
          <div>
            <p className={styles.eyebrow}>Projection schedule</p>
            <h2>Monthly breakdown</h2>
          </div>
          <span>{calc.monthWiseData.length} monthly rows</span>
        </div>

        <div
          className={styles.tableWrapper}
          role="region"
          aria-label="Monthly investment breakdown"
          tabIndex={0}
        >
          <table className={styles.breakdownTable}>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Month / year</th>
                <th scope="col">Investment</th>
                <th scope="col">Returns</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {calc.monthWiseData.map(createTableRowForMonth)}
            </tbody>
          </table>
        </div>
      </article>
    </Layout>
  );
}
