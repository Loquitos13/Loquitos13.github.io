# Requerimentos para utilizar three.js

Todos os projetos **three.js** necessitam de um ficheiro HTML para definir uma _webpage_, e um ficheiro _JavaScript_ para correr o código **three.js**.
Os nomes dos ficheiro não são importantes.

## Exemplo do ficheiro HTML

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script type="module" src="/main.js"></script>
	</body>
</html>
```

## Exemplo do ficheiro javascript
```javascript
import * as THREE from 'three';

...
```

É também importante criar uma pasta chamada __public__ de modo a armazenar todo o tipo de dados que serão utilizados pela biblioteca.
Sendo assim a estrutura do projeto terá uma aparência similar a:

```bash
├── index.html
├── main.js
└── public/
   └── modelos3D/
      └── 3DShirt.glb
   ├── texturas/  
      └── textura1
   └── audio/  
      └── audio1
```
