import { Fragment } from "react";

const DAILY_NEWS_TIME_ZONE = "Asia/Kolkata";
const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "nofollow noopener noreferrer",
};
const HEADLINE_SOURCE_ORDER = ["Washington Post", "Al Jazeera", "NPR", "China Daily", "The Hindu", "Reuters"];

const LIST_PANEL_CLASS_NAME =
  "overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)] dark:ring-white/5";
const NOTE_PANEL_CLASS_NAME =
  "rounded-md border border-slate-200 bg-slate-50/70 p-5 shadow-sm ring-1 ring-slate-100 dark:border-white/10 dark:bg-slate-900/70 dark:ring-white/5";

export function isDateOnlyValue(value = "") {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value).trim());
}

function getDateKeyInTimeZone(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: DAILY_NEWS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getCalendarDayNumber(date) {
  const [year, month, day] = getDateKeyInTimeZone(date).split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / (24 * 60 * 60 * 1000));
}

export function formatAbsoluteTimestamp(value) {
  if (!value) {
    return "";
  }

  const date = new Date(isDateOnlyValue(value) ? `${value}T00:00:00+05:30` : value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (isDateOnlyValue(value)) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: DAILY_NEWS_TIME_ZONE,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: DAILY_NEWS_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function formatRelativeTimeLabel(value, referenceDate = new Date(), granularity = "datetime") {
  const date = new Date(isDateOnlyValue(value) ? `${value}T00:00:00+05:30` : value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (granularity === "date" || isDateOnlyValue(value)) {
    const days = Math.max(0, getCalendarDayNumber(referenceDate) - getCalendarDayNumber(date));

    if (days === 0) {
      return "today";
    }

    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const diffMs = Math.max(0, referenceDate.getTime() - date.getTime());
  const minutes = Math.floor(diffMs / (60 * 1000));

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getHostnameLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return null;
  }
}

function SectionHeader({ id, title, subtitle, categoryTag = null }) {
  return (
    <div className="space-y-1.5">
      {categoryTag && (
        <span className="inline-flex items-center rounded-sm bg-indigo-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          {categoryTag}
        </span>
      )}
      <h2 id={id} className="mb-0 text-2xl font-bold text-slate-950 dark:text-slate-50 md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="my-0 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function RelativeTime({ value }) {
  if (!value) {
    return null;
  }

  const granularity = isDateOnlyValue(value) ? "date" : "datetime";
  const label = formatRelativeTimeLabel(value, new Date(), granularity);
  const title = formatAbsoluteTimestamp(value);

  if (!label || !title) {
    return null;
  }

  return (
    <time
      data-relative-time
      dateTime={value}
      title={title}
      data-relative-time-granularity={granularity}
      className="whitespace-nowrap font-medium"
    >
      {label}
    </time>
  );
}

function MetaLine({ segments = [], timeValue = null }) {
  const entries = [
    ...segments.filter(Boolean).map((value) => ({ type: "text", value })),
    ...(timeValue ? [{ type: "time", value: timeValue }] : []),
  ];

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
      {entries.map((entry, index) => (
        <Fragment key={`${entry.type}-${entry.value}-${index}`}>
          {index > 0 ? (
            <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
              &bull;
            </span>
          ) : null}
          <span className={index === 0 ? "font-semibold text-slate-700 dark:text-slate-300" : ""}>
            {entry.type === "time" ? <RelativeTime value={entry.value} /> : entry.value}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function resolveThumbnailSrc(item) {
  if (!item) {
    return null;
  }

  return item.thumbnailUrl || null;
}

function resolveSourceIconSrc(item) {
  if (!item || item.thumbnailUrl) {
    return null;
  }

  return item.sourceIconUrl || null;
}

function ExternalLinkIcon() {
  return (
    <svg
      className="ml-1 inline-block h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ListRowCard({
  href,
  title,
  thumbnailSrc = null,
  sourceIconSrc = null,
  thumbnailAlt = "",
  sourceIconAlt = "",
  metaSegments = [],
  timeValue = null,
  secondaryText = null,
}) {
  return (
    <article className="group border-t border-slate-100 first:border-t-0 transition duration-150 hover:bg-slate-50/80 dark:border-white/10 dark:hover:bg-white/[0.04]">
      <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-start md:gap-4 md:px-5">
        {thumbnailSrc ? (
          <a
            href={href}
            {...EXTERNAL_LINK_PROPS}
            className="block overflow-hidden rounded-sm border border-slate-200 bg-slate-100 md:w-44 md:shrink-0 dark:border-white/10 dark:bg-slate-800"
          >
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt || title}
              className="h-28 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-24"
            />
          </a>
        ) : sourceIconSrc ? (
          <a
            href={href}
            {...EXTERNAL_LINK_PROPS}
            className="flex h-24 w-full items-center justify-center rounded-sm border border-slate-200 bg-slate-50 md:w-44 md:shrink-0 dark:border-white/10 dark:bg-slate-800"
          >
            <img
              src={sourceIconSrc}
              alt={sourceIconAlt || thumbnailAlt || title}
              className="h-10 w-10 object-contain"
            />
          </a>
        ) : null}
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="mb-0 mt-0 text-base font-bold leading-snug text-slate-950 md:text-lg">
            <a
              href={href}
              {...EXTERNAL_LINK_PROPS}
              className="group/link inline-flex items-baseline text-slate-900 transition hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
            >
              <span>{title}</span>
              <ExternalLinkIcon />
            </a>
          </h3>
          <MetaLine segments={metaSegments} timeValue={timeValue} />
          {secondaryText ? (
            <p className="my-0 text-sm leading-6 text-slate-600 dark:text-slate-300">{secondaryText}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function HeadlineCard({ item }) {
  return (
    <ListRowCard
      href={item.url}
      title={item.title}
      thumbnailSrc={resolveThumbnailSrc(item)}
      sourceIconSrc={resolveSourceIconSrc(item)}
      thumbnailAlt={item.title}
      sourceIconAlt={`${item.source} icon`}
      metaSegments={[item.source, item.region]}
      timeValue={item.publishedAt}
      secondaryText={item.summary}
    />
  );
}

function sortHeadlineItems(items = []) {
  return [...items].sort((left, right) => {
    const leftPriority = HEADLINE_SOURCE_ORDER.indexOf(left.source);
    const rightPriority = HEADLINE_SOURCE_ORDER.indexOf(right.source);
    const normalizedLeftPriority = leftPriority === -1 ? HEADLINE_SOURCE_ORDER.length : leftPriority;
    const normalizedRightPriority = rightPriority === -1 ? HEADLINE_SOURCE_ORDER.length : rightPriority;

    if (normalizedLeftPriority !== normalizedRightPriority) {
      return normalizedLeftPriority - normalizedRightPriority;
    }

    return 0;
  });
}

function MarketSection({ items = [] }) {
  const gainerCount = items.filter((item) => item.direction === "up").length;
  const loserCount = items.length - gainerCount;

  return (
    <section data-daily-news-section="markets" className="daily-news-section space-y-5">
      <SectionHeader
        id="market-snapshot"
        categoryTag="FINANCIAL MARKETS"
        title="Market Snapshot"
        subtitle="Latest completed trading sessions across global benchmark equity indexes."
      />

      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
              {gainerCount} Gainers
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <span className="h-2 w-2 rounded-sm bg-rose-500" />
              {loserCount} Losers
            </span>
          </div>
          <span className="text-slate-400 dark:text-slate-500">
            {items.length} Benchmark Indexes Tracked
          </span>
        </div>
      )}

      <div className={LIST_PANEL_CLASS_NAME}>
        <div className="overflow-x-auto">
          <table className="daily-news-market-table min-w-[760px] border-separate border-spacing-0">
            <thead className="bg-slate-100/90 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-950/80 dark:text-slate-300">
              <tr>
                <th className="px-5 py-3">Index</th>
                <th className="w-24 whitespace-nowrap px-4 py-3">Region</th>
                <th className="w-36 whitespace-nowrap px-4 py-3">Session Date</th>
                <th className="w-28 whitespace-nowrap px-4 py-3 text-right">Value</th>
                <th className="w-44 whitespace-nowrap px-4 py-3 text-right">Change</th>
                <th className="w-28 whitespace-nowrap px-5 py-3 text-right">Direction</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-transparent">
              {items.map((item) => {
                const isUp = item.direction === "up";
                return (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100 transition-colors first:border-t-0 hover:bg-slate-50/80 dark:border-white/10 dark:hover:bg-white/[0.04]"
                  >
                    <td className="px-5 py-3.5 align-top">
                      <div className="font-bold text-slate-950 dark:text-slate-100">{item.label}</div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.region}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500 dark:text-slate-400">
                      {item.sessionDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-semibold tabular-nums text-slate-950 dark:text-slate-100">
                      {Number(item.value).toFixed(2)}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-3.5 text-right text-sm font-bold tabular-nums ${
                        isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {`${Number(item.change) > 0 ? "+" : ""}${Number(item.change).toFixed(2)} (${Number(item.percentChange) > 0 ? "+" : ""}${Number(item.percentChange).toFixed(2)}%)`}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${
                          isUp
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                            : "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20"
                        }`}
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          {isUp ? (
                            <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H5a1 1 0 01-1-1V1a1 1 0 112 0v4.586l4.293-4.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 3.414V7z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M12 13a1 1 0 01-1-1V7.414l-4.293 4.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0L15 10.586V13a1 1 0 01-1 1h-2z" clipRule="evenodd" />
                          )}
                        </svg>
                        <span>{isUp ? "Up" : "Down"}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HackerNewsSection({ items = [] }) {
  return (
    <section data-daily-news-section="hacker-news" className="daily-news-section space-y-5">
      <SectionHeader
        id="hacker-news"
        categoryTag="TECH COMMUNITY"
        title="Hacker News"
        subtitle="Top discussions and links trending in the tech & developer ecosystem over the last 24 hours."
      />
      <div className={LIST_PANEL_CLASS_NAME}>
        {items.map((item, index) => (
          <ListRowCard
            key={`${item.url}-${index}`}
            href={item.url}
            title={item.title}
            metaSegments={["Hacker News", getHostnameLabel(item.url) || "External link"]}
            timeValue={item.publishedAt}
            secondaryText={item.summary}
          />
        ))}
      </div>
    </section>
  );
}

function ProductHuntSection({ items = [] }) {
  return (
    <section data-daily-news-section="product-hunt" className="daily-news-section space-y-5">
      <SectionHeader
        id="product-hunt"
        categoryTag="NEW PRODUCTS"
        title="Product Hunt"
        subtitle="Curated products and software tools featured in recent Product Hunt listings."
      />
      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-400">
          Product Hunt data was unavailable for this edition.
        </div>
      ) : (
        <div className={LIST_PANEL_CLASS_NAME}>
          {items.map((item, index) => (
            <ListRowCard
              key={`${item.url || item.name}-${index}`}
              href={item.url}
              title={item.name}
              thumbnailSrc={resolveThumbnailSrc(item)}
              thumbnailAlt={item.name}
              metaSegments={["Product Hunt Launch"]}
              timeValue={item.publishedAt}
              secondaryText={item.tagline}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function SourceNotesSection({ sourceNotes = {} }) {
  return (
    <section data-daily-news-section="source-notes" className="daily-news-section space-y-5">
      <SectionHeader
        id="source-notes"
        categoryTag="METADATA & DIAGNOSTICS"
        title="Source Notes"
        subtitle="Generation parameters, data coverage statistics, and automated pipeline execution details."
      />
      <div className={NOTE_PANEL_CLASS_NAME}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated Timestamp
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {formatAbsoluteTimestamp(sourceNotes.generatedAt) || sourceNotes.generatedAt || "N/A"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pipeline Time Zone
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {sourceNotes.timeZone || DAILY_NEWS_TIME_ZONE}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Data Feeds
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {sourceNotes.successfulSources?.join(", ") || "None"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Market Session Tag
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {sourceNotes.marketSessionLabel || "No market session label"}
            </div>
          </div>
        </div>

        {sourceNotes.warnings?.length ? (
          <div className="mt-5 rounded-sm border border-amber-200 bg-amber-50/90 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Pipeline Warnings</span>
            </div>
            <ul className="mt-2.5 space-y-1.5 pl-5 text-sm text-amber-900 dark:text-amber-100">
              {sourceNotes.warnings.map((warning, index) => (
                <li key={`${warning}-${index}`}>{warning}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function DailyNewsPayloadRenderer({ payload }) {
  if (!payload) {
    return null;
  }

  return (
    <div className="daily-news-body space-y-10">
      <section data-daily-news-section="headlines" className="daily-news-section space-y-5">
        <SectionHeader
          id="global-headlines"
          categoryTag="WORLD NEWS"
          title="Global Headlines"
          subtitle="Top international news stories aggregated across world outlets in a fast daily briefing."
        />
        <div className={LIST_PANEL_CLASS_NAME}>
          {sortHeadlineItems(payload.headlines).map((item, index) => (
            <HeadlineCard key={`${item.url || item.title}-${index}`} item={item} />
          ))}
        </div>
      </section>

      <MarketSection items={payload.markets} />
      <HackerNewsSection items={payload.hackerNews} />
      <ProductHuntSection items={payload.productHunt} />
      <SourceNotesSection sourceNotes={payload.sourceNotes} />
    </div>
  );
}
