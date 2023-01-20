# Grunt
- Ferramenta para automação de tarefas, podendo compilar arquivos, comprensão de imagens etc...

- Instalando globalmente

```bash
npm i -g grunt-cli
```

- Adicionando o módulo no projeto

```bash
npm init
npm i --save-dev grunt
```

- Após isso, será necessário criar o arquivo ``gruntfile.js``, e configurar para uso.

```js
modules.exports = function(grunt){
	grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
    })
}
```

### Criação de tarefas

- Para criar uma tarefa no Grunt, usamos ``grunt.registerTask('nomeDaTarefa', function Tarefa(){...})``.

```js
grunt.register('nomeTarefa', function funcTarefa(){
    code...
})
```

- Caso a tarefa executada precise de mais tempo para finalizar, ela deverá se tornar assíncrona.

```js
grunt.register('nomeTarefa', function funcTarefa(){
    const done = this.async();
    setTimeout(function(){
        console.log("Olá Grunt!")
    	done();
    }, 5000)
})
```

- Para chamar a tarefa, podemos chamar pelo nome, ou chamando a tarefa default com o array de tarefas.
- Chamando tarefa pelo nome

```js
grunt.register('nomeTarefa', function funcTarefa(){
    const done = this.async();
    setTimeout(function(){
        console.log("Olá Grunt!")
    	done();
    }, 5000)
})
```

*No terminal*

```bash
npm run grunt nomeTarefa
```

- Passando Array de tarefas

```js
grunt.register('default', ['tarefa1', 'tarefa2'...])
```

*No terminal*

```Bash
npm run grunt
```

### Usando Grunt para compilar LESS

- Instalando o plugin

```bash
npm i --save-dev grunt-contrib-less
```

- Carregando o plugin

```js
grunt.loadNpmTasks('grunt-contrib-less')
```

- Configurando o plugin

```js
grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),
	less: {
        development: { // ambiente de desenvolvimento
            files: {
                'arquivoDestino.css' : 'arquivoOrigem.less'
            }
        },
		production:{ // ambiente de producao
			options:{
				compresse: true,
			},
			files:{
				'main.min.css' : 'main.less'
             }
		}
    }
});
```

### Usando Grunt para compilar Sass

- Instalando o plugin

```bash
npm i --save-dev grunt-contrib-sass
```

- Carregando o plugin

```js
grunt.loadNpmTasks('grunt-contrib-sass')
```

### Executando tarefas de forma paralela

- Para executar tarefas em paralelo no Grunt, devemos instalar um plugin que nos permitirá a execução paralela.

```bash
npm i --save-dev grunt-concurrent
```

- Carregando o plugin

```js
grunt.loadNpmTasks('grunt-concurrent')
```

- No arquivo de configuração, passamos a seguinte ordem:
  - ``concurrent`` = Responsável pelo execução paralela.
  - ``target`` = Irá receber as tarefas que deverão ser executadas.
- E em seguida, chamamos o plugin 
  - ``grunt.registerTasks('default', ['concurrent'])``
- Exemplo:

```js
grunt.initiConfig....
	configs....
	concurrent:{
        target:['tarefa1', 'tarefa2', 'tarefa3', ...]
    }
                
grunt.registerTasks('default', ['concurrent'])
```

### Observando mudanças com o Grunt

- Para observar as mudanças com o Grunt, devemos instalar o plugin ``watch`` 

```bash
npm i --save-dev grunt-contrib-watch
```

- Devemos carregar o plugin

```js
grunt.loadNpmTasks('grunt-contrib-watch')
```

- Configurando o ``watch``

```js
grunt.initiConfig....
	configs....
	watch:{
        files:['/arquivoOrigem'],
        tasks:['nomePlugin:nomeTask'],
    }
                
grunt.registerTasks('default', ['watch'])
```

### Comprimindo HTML com o Grunt

- Será criado um HTML que será a ponte para a pasta ``dev``, e outra para a pasta ``dist``, para isso, será necessário o uso de um plugin.

```bash
npm i --save-dev grunt-replace
```

```js
grunt.loadNpmTasks('grunt-replace')
```

- Configurando o ``replace``:

```js
replace:{
    nomeDaPastaOrigem:{
        options:{ 
            patterns:[{
                match: 'css', //palavra que será substituida (no arquivo deverá estar '@@palavraQueSeraSubstituida')
                replacement: './js'// palavra que ira substituir
            }]
        },
		files:[{
            expand:true,
		   flatten:true,
		   src: ['pastaOrigem/arquivoOrigem'],
            dev: 'pastaDestino/'
        }]
    }
}
```

### Mini ficando o arquivo HTML

- Deve ser instalado o plugin ``grunt-htmlmin``

```bash
npm i --save-dev grunt-htmlmin
```

```js
grunt.loadNpmTasks('grunt-htmlmin')
```

- Na atividade, iremos mini ficar o arquivo HTML e enviar para uma pasta temporária, enviar para a pasta ``dist``, e alterar o arquivo css para o ``main.min.css``.

- Configurando o ``htmlmin``

```js
htmlmin:{
    dist:{
        options:{
            removeComments:true,
		   collapseWhitespace:true
        },
        files:{
            'temp/origem': 'pasta/arquivo'
        }
    }
}
```

### Excluindo pastas/arquivos com o GruntJS

- Instalar o plugin ``grunt-contrib-clean``

```bash
npm i --save-dev grunt-contrib-clean
```

```js
grunt.loadNpmTasks('grunt-contrib-clean')
```

- Configurando o ``clean``

```js
clean:['pasta/arquivo']
```

### Comprimindo JavaScript com o Grunt

- Instalar o plugin ``grunt-contrib-uglify``

```bash
npm i --save-dev grunt-contrib-uglify
```

```js
grunt.loadNpmTasks('grunt-contrib-uglify')
```

