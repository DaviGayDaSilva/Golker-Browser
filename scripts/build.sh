#!/bin/bash
# Golker Browser Build Script
# Supported: DEB, AppImage, APK

set -e

VERSION="1.0.0"
APP_NAME="Golker Browser"
PACKAGE_NAME="golker-browser"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== Golker Browser Build Script ===${NC}"
echo "Versão: $VERSION"

# Verificar dependências
check_deps() {
    echo -e "${YELLOW}Verificando dependências...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Erro: Node.js não encontrado. Instale Node.js 18+${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Erro: npm não encontrado${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Dependências OK${NC}"
}

# Instalar dependências
install_deps() {
    echo -e "${YELLOW}Instalando dependências...${NC}"
    npm install
    echo -e "${GREEN}Dependências instaladas${NC}"
}

# Compilar para Linux DEB
build_deb() {
    echo -e "${YELLOW}Compilando pacote DEB...${NC}"
    npm run build:deb
    echo -e "${GREEN}DEB criado com sucesso!${NC}"
}

# Compilar para Linux AppImage
build_appimage() {
    echo -e "${YELLOW}Compilando AppImage...${NC}"
    npm run build:appimage
    echo -e "${GREEN}AppImage criado com sucesso!${NC}"
}

# Compilar para Android APK
build_apk() {
    echo -e "${YELLOW}Compilando APK para Android...${NC}"
    
    # Verificar Android SDK
    if [ -z "$ANDROID_HOME" ]; then
        echo -e "${YELLOW}ANDROID_HOME não definido. Tentando localizar...${NC}"
        if [ -d "$HOME/Android/Sdk" ]; then
            export ANDROID_HOME="$HOME/Android/Sdk"
        elif [ -d "/usr/lib/android-sdk" ]; then
            export ANDROID_HOME="/usr/lib/android-sdk"
        fi
    fi
    
    npm run build:apk
    echo -e "${GREEN}APK criado com sucesso!${NC}"
}

# Compilar tudo
build_all() {
    check_deps
    install_deps
    
    echo -e "${YELLOW}Iniciando build completo...${NC}"
    
    build_deb
    build_appimage
    build_apk
    
    echo -e "${GREEN}=== Build completo! ===${NC}"
    echo "Pacotes criados em: dist/"
    ls -la dist/
}

# Mostrar uso
usage() {
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos:"
    echo "  deps      - Instalar dependências"
    echo "  deb       - Compilar pacote DEB"
    echo "  appimage  - Compilar AppImage"
    echo "  apk       - Compilar APK para Android"
    echo "  all       - Compilar todos os pacotes"
    echo "  help      - Mostrar esta ajuda"
    echo ""
}

# Main
case "${1:-help}" in
    deps)
        check_deps
        install_deps
        ;;
    deb)
        check_deps
        build_deb
        ;;
    appimage)
        check_deps
        build_appimage
        ;;
    apk)
        check_deps
        build_apk
        ;;
    all)
        build_all
        ;;
    help|*)
        usage
        ;;
esac
