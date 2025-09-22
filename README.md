# Pausa para Respirar 🧘‍♀️

Uma extensão do Chrome que transforma a página de Nova Aba em um exercício de respiração guiado para mindfulness e redução de estresse.

## ✨ Características

- **Exercício de Respiração Guiado**: Animação sincronizada de círculo e texto
- **3 Ciclos Completos**: Padrão de respiração otimizado para relaxamento
- **Experiência Passiva**: Nenhuma interação do usuário necessária
- **Design Sereno**: Cores suaves e animações calmantes
- **Duração Finita**: 3 ciclos e conclusão elegante
- **Responsivo**: Funciona perfeitamente em qualquer tamanho de tela
- **Acessível**: Suporte a modo de alto contraste e movimento reduzido

## 🎯 Como Funciona

### Padrão de Respiração
- **Inspire...**: 4 segundos de expansão do círculo
- **Segure.**: 2 segundos mantendo o tamanho máximo
- **Expire...**: 6 segundos de contração do círculo
- **3 Ciclos Completos**: Total de ~36 segundos de exercício

### Experiência Visual
- **Círculo Animado**: Expande e contrai suavemente
- **Texto Guiado**: Instruções claras em português
- **Cores Calmantes**: Tons de azul suave e cinza claro
- **Mensagem Final**: "Tenha um momento de paz."

### Design Minimalista
- **Interface Limpa**: Foco total na respiração
- **Sem Distrações**: Nenhum botão ou link
- **Tipografia Suave**: Fonte Nunito para legibilidade
- **Animações Suaves**: Transições elegantes

## 🚀 Instalação

### Desenvolvimento

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Build do projeto**
   ```bash
   npm run build
   ```

3. **Carregue no Chrome**
   - Abra `chrome://extensions/`
   - Ative o "Modo do desenvolvedor"
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `dist`

### Produção

1. **Build para produção**
   ```bash
   npm run package
   ```

2. **Instale o arquivo ZIP**
   - O comando acima gera `pausa-para-respirar.zip`
   - Arraste o arquivo para `chrome://extensions/`

## 🛠️ Scripts Disponíveis

- `npm run build` - Build de produção
- `npm run dev` - Build de desenvolvimento com watch
- `npm run clean` - Limpa a pasta dist
- `npm run package` - Cria arquivo ZIP para distribuição

## 📁 Estrutura do Projeto

```
pausa-para-respirar/
├── src/
│   ├── newtab/           # Página de nova aba
│   │   ├── newtab.html   # Estrutura HTML
│   │   ├── newtab.css    # Estilos CSS
│   │   └── newtab.ts     # Lógica principal
│   ├── types/
│   │   └── interfaces.ts # Interfaces TypeScript
│   └── utils/
│       └── animationUtils.ts # Utilitários de animação
├── icons/                # Ícones da extensão
├── manifest.json         # Manifesto da extensão
└── dist/                 # Build de produção
```

## 🧘‍♀️ Exercício de Respiração

### Padrão Científico
- **4-2-6**: Baseado em técnicas de respiração terapêutica
- **Ativação do Sistema Nervoso Parassimpático**: Promove relaxamento
- **Redução do Cortisol**: Hormônio do estresse
- **Melhora da Concentração**: Foco no presente

### Benefícios
- **Redução do Estresse**: Diminui tensão e ansiedade
- **Melhora do Foco**: Aumenta concentração e clareza mental
- **Relaxamento**: Promove sensação de calma e bem-estar
- **Mindfulness**: Desenvolve consciência do momento presente

## 🎨 Design e UX

### Paleta de Cores
- **Fundo**: Gradiente suave de cinza claro (#F5F5F5)
- **Círculo**: Azul suave com gradiente (#AEC6CF)
- **Texto**: Tons de azul acinzentado (#6B8A8A)
- **Elementos Ambientes**: Círculos flutuantes sutis

### Tipografia
- **Nunito**: Fonte suave e arredondada
- **Pesos**: 300-700 para hierarquia visual
- **Espaçamento**: Letter-spacing otimizado para legibilidade

### Animações
- **Transições Suaves**: 4s ease-in-out para expansão
- **Fade In/Out**: 0.5s para mudanças de texto
- **Elementos Flutuantes**: 20s para ambiente calmo

## 🔧 Tecnologias Utilizadas

- **TypeScript** - Tipagem estática e melhor DX
- **Webpack** - Bundling e otimização
- **Chrome Extension Manifest V3** - API moderna do Chrome
- **CSS Grid/Flexbox** - Layout responsivo
- **Google Fonts** - Tipografia (Nunito)
- **SVG** - Ícones vetoriais escaláveis

## 🎯 Funcionalidades Técnicas

### Sistema de Animação
```typescript
// Ciclo de respiração completo
async runBreathingCycle(): Promise<void> {
  await this.executePhase('inhale');  // 4s
  await this.executePhase('hold');    // 2s
  await this.executePhase('exhale');  // 6s
}
```

### Controle de Estado
```typescript
interface AnimationState {
  currentPhase: BreathingPhase;
  currentCycle: number;
  isRunning: boolean;
  startTime: number;
  endTime: number;
}
```

### Configuração de Respiração
```typescript
const DEFAULT_BREATHING_CONFIG = {
  inhaleDuration: 4000,  // 4 segundos
  holdDuration: 2000,    // 2 segundos
  exhaleDuration: 6000,  // 6 segundos
  totalCycles: 3,        // 3 ciclos completos
  cycleDelay: 1000       // 1 segundo entre ciclos
};
```

## 📱 Compatibilidade

- **Chrome**: Versão 88+
- **Edge**: Versão 88+ (baseado em Chromium)
- **Dispositivos**: Desktop, tablet, mobile
- **Resoluções**: 320px - 4K+
- **Sistemas Operacionais**: Windows, macOS, Linux

## ♿ Acessibilidade

### Recursos de Acessibilidade
- **Alto Contraste**: Suporte automático
- **Movimento Reduzido**: Respeita preferências do sistema
- **Navegação por Teclado**: Suporte completo
- **Leitores de Tela**: Estrutura semântica

### Configurações
- **Reduced Motion**: Duração limitada a 1s
- **High Contrast**: Cores otimizadas
- **Screen Reader**: Textos descritivos

## 🎯 Casos de Uso

### Para Profissionais
- **Pausa no Trabalho**: Momento de relaxamento entre tarefas
- **Redução de Estresse**: Alívio da tensão do dia a dia
- **Melhora da Produtividade**: Foco renovado após o exercício
- **Bem-estar Mental**: Cuidado com a saúde mental

### Para Estudantes
- **Antes de Provas**: Redução da ansiedade
- **Entre Estudos**: Pausa para recarregar
- **Concentração**: Melhora do foco e atenção
- **Relaxamento**: Alívio da pressão acadêmica

### Para Qualquer Pessoa
- **Mindfulness Diário**: Prática regular de atenção plena
- **Gerenciamento de Estresse**: Ferramenta de relaxamento
- **Bem-estar Geral**: Cuidado com a saúde mental
- **Momento de Paz**: Pausa para respirar e refletir

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Comunidade de Mindfulness** - Pela inspiração e conhecimento
- **Desenvolvedores** - Pelo feedback e sugestões
- **Usuários** - Pelo uso e contribuições

## 📞 Suporte

- **Email**: anielleandrade.developer@gmail.com

---

**Pausa para Respirar** - Transforme cada nova aba em um momento de paz e mindfulness! 🧘‍♀️✨
