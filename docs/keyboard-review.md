# Keyboard and visual review

The eight-route Playwright keyboard pass is recorded in browser-report.json. It exercises Tab, Enter, the skip link, main focus target, native navigation panel and FAQs; focused controls were checked for obstruction by the mobile contact bar. That bar disappears at the Commander section.

A separate keyboard-only sequence reached the mobile menu with Tab, opened it with Enter, verified the visible focus ring, and closed it with Escape in both languages. The agent reviewed the focused menu and skip-link screenshots. Evidence: keyboard-interactions.json and .audit/screenshots/*-keyboard-*.png.

The agent inspected rendered screenshots of the French and Arabic homepages at 375x667 and 1440x900, plus the full desktop layout. Both hero actions are visible, the mirrored Arabic composition reads right to left, category drawings remain visibly labelled, and the Instagram handle stays left to right.

This is an agent-operated browser review, not a human screen-reader certification. Before public launch, a native derja speaker should read the Arabic content and a human should confirm keyboard and screen-reader behavior on real devices. Reflow was tested at the equivalent widths for 200% and 400%; actual OS/browser zoom and mobile safe-area hardware are remaining device checks.
