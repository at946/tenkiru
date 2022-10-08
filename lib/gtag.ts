export const GA_TRACKING_ID: string = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (props: {
  action: string;
  category: string;
  label: string;
  value?: string;
}) => {
  if (!GA_TRACKING_ID) return;
  window.gtag('event', props.action, {
    event_category: props.category,
    event_label: props.label,
    value: props.value,
  });
};
