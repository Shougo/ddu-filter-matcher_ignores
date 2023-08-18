import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v3.5.1/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.5.1/deps.ts";

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
    console.log(ignores);
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
