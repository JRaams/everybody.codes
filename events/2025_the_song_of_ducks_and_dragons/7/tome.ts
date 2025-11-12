import { defaultDict } from "../../../util/defaultdict";

export function parse(input: string) {
  const [namesRaw, rulesRaw] = input.split("\n\n");

  const names = namesRaw.split(",");
  const rules = defaultDict(() => new Set<string>());

  rulesRaw.split("\n").forEach((line) => {
    const [from, toRaw] = line.split(" > ");
    toRaw.split(",").forEach((to) => {
      rules[from].add(to);
    });
  });

  return { names, rules };
}
