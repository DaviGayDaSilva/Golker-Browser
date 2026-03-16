# Instruções para Compilar o APK do Golker Browser

## Requisitos

- Java JDK 17+ (`sudo apt install openjdk-17-jdk`)
- Android SDK (`https://developer.android.com/studio`)
- Gradle 8.0+

## Passos para Compilar

### 1. Configure o Ambiente

```bash
# Defina as variáveis de ambiente
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=/caminho/para/android-sdk
export PATH=$JAVA_HOME/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```

### 2. Instale o Android SDK

```bash
# Baixe o command-line tools
mkdir -p $ANDROID_HOME/cmdline-tools
cd $ANDROID_HOME/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
mv cmdline-tools latest

# Instale as plataformas necessárias
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platforms;android-21" "build-tools;21.0.1"
```

### 3. Compile o APK

```bash
cd android
chmod +x build.sh
./build.sh
```

O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

## Solução de Problemas

### Erro: "SDK location not found"
Certifique-se de que `local.properties` contém o caminho correto para o SDK:
```
sdk.dir=/caminho/para/android-sdk
```

### Erro: "Java version not supported"
Use Java 17:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

## Características do Navegador Android

O Golker Browser para Android usa:
- **WebView**: Motor de renderização baseado em Chromium (o mesmo do Chrome)
- **Aceleração de hardware**: Para melhor performance
- **Suporte a HTML5**: Compatibilidade total com sites modernos
- **JavaScript ativado**: Suporte completo a aplicações web

## Instalação

Após compilar, instale o APK no seu dispositivo Android:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Ou transfira o arquivo APK para o dispositivo e instale manualmente ( habilite "Fontes desconhecidas" nas configurações).
