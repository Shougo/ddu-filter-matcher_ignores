import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v4.0.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v4.0.0/deps.ts";

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
