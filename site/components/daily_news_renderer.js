import { Fragment } from "react";

const DAILY_NEWS_TIME_ZONE = "Asia/Kolkata";
const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "nofollow noopener noreferrer",
};

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

function SectionHeader({ id, title, subtitle }) {
  return (
    <div className="space-y-2">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-3xl text-sm leading-6 text-slate-500 md:text-base">{subtitle}</p>
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
      datetime={value}
      title={title}
      data-relative-time-granularity={granularity}
      className="whitespace-nowrap"
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
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 md:text-xs">
      {entries.map((entry, index) => (
        <Fragment key={`${entry.type}-${entry.value}-${index}`}>
          {index > 0 ? (
            <span className="text-slate-300" aria-hidden="true">
              &bull;
            </span>
          ) : null}
          <span>{entry.type === "time" ? <RelativeTime value={entry.value} /> : entry.value}</span>
        </Fragment>
      ))}
    </div>
  );
}

function ListRowCard({
  href,
  title,
  thumbnailSrc = null,
  thumbnailAlt = "",
  metaSegments = [],
  timeValue = null,
  secondaryText = null,
}) {
  return (
    <article className="group border-t border-slate-200 first:border-t-0 transition duration-150 hover:bg-slate-50/80">
      <div className="flex flex-col gap-2.5 px-3 py-2.5 md:flex-row md:items-start md:gap-4 md:px-4 md:py-2">
        {thumbnailSrc ? (
          <a
            href={href}
            {...EXTERNAL_LINK_PROPS}
            className="block overflow-hidden rounded-xl border border-slate-100 md:w-40 md:shrink-0"
          >
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt || title}
              className="h-28 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-24"
            />
          </a>
        ) : null}
        <div className="min-w-0 flex-1 space-y-0">
          <h3 className="text-base font-semibold leading-snug text-slate-900 md:text-lg mt-2 mb-0">
            <a href={href} {...EXTERNAL_LINK_PROPS} className="transition hover:text-sky-700">
              {title}
            </a>
          </h3>
          <MetaLine segments={metaSegments} timeValue={timeValue} />
          {secondaryText ? <p className="text-sm leading-[1.35] text-slate-600">{secondaryText}</p> : null}
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
      thumbnailSrc={item.localThumbnail}
      thumbnailAlt={item.title}
      metaSegments={[item.source, item.region]}
      timeValue={item.publishedAt}
    />
  );
}

function MarketSection({ items = [] }) {
  return (
    <section data-daily-news-section="markets" className="daily-news-section space-y-6">
      <SectionHeader
        id="market-snapshot"
        title="Market Snapshot"
        subtitle="Latest completed sessions across the selected benchmark indexes."
      />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-950 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-100">
              <tr>
                <th className="px-4 py-3">Index</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Session Date</th>
                <th className="px-4 py-3 text-right">Value</th>
                <th className="px-4 py-3 text-right">Change</th>
                <th className="px-4 py-3 text-right">Direction</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items.map((item) => {
                const isUp = item.direction === "up";
                return (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-4 align-top">
                      <div className="font-semibold text-slate-900">{item.label}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.region}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{item.sessionDate}</td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-slate-900">
                      {Number(item.value).toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-4 text-right text-sm font-semibold ${
                        isUp ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {`${Number(item.change).toFixed(2)} (${Number(item.percentChange).toFixed(2)}%)`}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          isUp
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : "bg-rose-50 text-rose-700 ring-rose-200"
                        }`}
                      >
                        {isUp ? "Up" : "Down"}
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
    <section data-daily-news-section="hacker-news" className="daily-news-section space-y-6">
      <SectionHeader
        id="hacker-news"
        title="Hacker News"
        subtitle="Ten notable links from the last day in the Hacker News ecosystem."
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
        {items.map((item, index) => (
          <ListRowCard
            key={`${item.url}-${index}`}
            href={item.url}
            title={item.title}
            metaSegments={[getHostnameLabel(item.url) || "External link"]}
            timeValue={item.publishedAt}
          />
        ))}
      </div>
    </section>
  );
}

function ProductHuntSection({ items = [] }) {
  return (
    <section data-daily-news-section="product-hunt" className="daily-news-section space-y-6">
      <SectionHeader
        id="product-hunt"
        title="Product Hunt"
        subtitle="Featured products from the latest public Product Hunt listings."
      />
      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
          Product Hunt data was unavailable for this edition.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
          {items.map((item, index) => (
            <ListRowCard
              key={`${item.url || item.name}-${index}`}
            href={item.url}
            title={item.name}
            thumbnailSrc={item.localThumbnail}
            thumbnailAlt={item.name}
            metaSegments={["Product Hunt"]}
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
    <section data-daily-news-section="source-notes" className="daily-news-section space-y-6">
      <SectionHeader
        id="source-notes"
        title="Source Notes"
        subtitle="Generation details, data coverage, and any partial-source warnings for this edition."
      />
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Generated At</div>
            <div className="text-sm text-slate-700">
              {formatAbsoluteTimestamp(sourceNotes.generatedAt) || sourceNotes.generatedAt}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Time Zone</div>
            <div className="text-sm text-slate-700">{sourceNotes.timeZone || DAILY_NEWS_TIME_ZONE}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              News Sources With Data
            </div>
            <div className="text-sm text-slate-700">
              {sourceNotes.successfulSources?.join(", ") || "None"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Market Session Label</div>
            <div className="text-sm text-slate-700">{sourceNotes.marketSessionLabel || "No market data available"}</div>
          </div>
        </div>
        {sourceNotes.warnings?.length ? (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Warnings</div>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
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
      <section data-daily-news-section="headlines" className="daily-news-section space-y-6">
        <SectionHeader
          id="global-headlines"
          title="Global Headlines"
          subtitle="Top stories across selected outlets, presented in a fast daily brief format."
        />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
          {payload.headlines?.map((item, index) => (
            <HeadlineCard key={`${item.url || item.title}-${index}`} item={item} />
          ))}
        </div>
      </section>

      <HackerNewsSection items={payload.hackerNews} />
      <ProductHuntSection items={payload.productHunt} />
      <MarketSection items={payload.markets} />
      <SourceNotesSection sourceNotes={payload.sourceNotes} />
    </div>
  );
}
