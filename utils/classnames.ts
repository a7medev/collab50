const cn = (...args: unknown[]) => args.filter(Boolean).join(' ');

export default cn;
