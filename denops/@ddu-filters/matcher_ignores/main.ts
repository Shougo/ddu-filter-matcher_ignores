import type { DduItem } from "@shougo/ddu-vim/types";
import { BaseFilter } from "@shougo/ddu-vim/filter";

import type { Denops } from "@denops/std";

type Params = {
  actionKey: string;
  ignores: string[] | string;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    denops: Denops;
    filterParams: Params;
    items: DduItem[];
  }): Promise<DduItem[]> {
    const ignores = typeof args.filterParams.ignores === "string"
      ? args.filterParams.ignores.split(",")
      : args.filterParams.ignores;
    return Promise.resolve(args.items.filter(
      (item) => {
        const attr = (item.action as Record<string, string>)[
          args.filterParams.actionKey
        ] ?? item.word;
        return !ignores.includes(attr);
      },
    ));
  }

  override params(): Params {
    return {
      actionKey: "",
      ignores: [],
    };
  }
}
