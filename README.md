# xml-parser-lite

Parser XML mínimo que converte em JSON: elementos, atributos e texto.

## Instalação

```bash
npm install xml-parser-lite
```

## Uso

```ts
import { parseXML } from "xml-parser-lite";

const node = parseXML("<root><a id=\"1\">hi</a></root>");
```

## API

- `parseXML(xml: string): XmlNode` — estrutura `{ tag, attrs, children, text }`.

## Licença

MIT
