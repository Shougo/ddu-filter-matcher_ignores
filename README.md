# ddu-filter-matcher_ignores

Ignore specified items matcher for ddu.vim

This matcher filters specified items.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_ignores'],
    \     },
    \   }
    \ })

" Ignore current buffer
call ddu#custom#patch_global(#{
    \   filterParams: #{
    \     _: #{
    \       ignores: '%'->bufname()->fnamemodify(':p'),
    \       actionKey: 'path',
    \     },
    \   }
    \ })
```
