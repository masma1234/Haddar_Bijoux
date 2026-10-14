# Analytics decision

Nothing is installed or loaded. The current site makes no analytics requests and stores no consent choice because there is nothing to consent to on the website.

| Option | What would change | Decision |
|---|---|---|
| Cookieless analytics, for example self-hosted Umami, Plausible or Cloudflare Web Analytics | Choose a provider, examine its real configuration, processing location, retention and legal requirements, then update the privacy page and third-party inventory. Cookieless does not automatically mean exempt from every legal obligation. | Await client choice |
| Google Analytics 4 behind prior consent | Load nothing before consent. Offer equally prominent Accept and Refuse controls, nothing preselected, and a persistent footer control to revoke the choice. Record the choice only after deciding the retention period. Stop collection after withdrawal and update privacy/CSP and audits. | Await client choice |

These are implementation options, not installed dependencies or a recommendation to activate tracking. Future changes require new privacy and network audits.
