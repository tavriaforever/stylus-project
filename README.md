# stylus-project

## What the problem?
Founded a bug when stylus caches disclosure @import, as a result, if the paths have similar parts – styles taken result css from the first import as many times as imports.

### For example:
Two `styl` file
**path 1**: `../../libs/blocks/icon/icon.styl`
**content**:
```stylus
.icon
{
    display: inline-block;

    text-align: center;

    background: 50% no-repeat;

    /* Hack for correct baseline positioning */
    &:empty:after
    {
        visibility: hidden;

        content: '\00A0';
    }

    /*
     * Чтобы иконка правильно позиционировалась внутри блочного контекста,
     * нужно прописать родителю свойство line-height со значением, равным высоте иконки
     */
    & > img,
    & > svg
    {
        margin: -5.15em 0 -5em; /* 0.15 — magic number, empirically found */

        vertical-align: middle;
    }
}

```

**path 2**: `../../blocks/icon/icon.styl`
**content**:
```stylus
.icon
{
    width: 200px;
    height: 200px;
    color: #000;
}
```

Index.styl file contain two imports:
```stylus
@import "../../libs/blocks/icon/icon.styl";
@import "../../blocks/icon/icon.styl";

```

### Result:
```
.icon {
  display: inline-block;
  text-align: center;
  background: 50% no-repeat;
/* Hack for correct baseline positioning */
/*
     * Чтобы иконка правильно позиционировалась внутри блочного контекста,
     * нужно прописать родителю свойство line-height со значением, равным высоте иконки
     */
}
.icon:empty:after {
  visibility: hidden;
  content: '\00A0';
}
.icon > img,
.icon > svg {
  margin: -5.15em 0 -5em; /* 0.15 — magic number, empirically found */
  vertical-align: middle;
}
.icon {
  display: inline-block;
  text-align: center;
  background: 50% no-repeat;
/* Hack for correct baseline positioning */
/*
     * Чтобы иконка правильно позиционировалась внутри блочного контекста,
     * нужно прописать родителю свойство line-height со значением, равным высоте иконки
     */
}
.icon:empty:after {
  visibility: hidden;
  content: '\00A0';
}
.icon > img,
.icon > svg {
  margin: -5.15em 0 -5em; /* 0.15 — magic number, empirically found */
  vertical-align: middle;
}
```


## How to reproduced bug?

``` bash
npm install
npm run build
```
