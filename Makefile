# Makefile para Golker Browser

.PHONY: all deps build build-deb build-appimage build-apk clean test

VERSION = 1.0.0
NODE = node
NPM = npm

all: deps build

# Instalar dependências
deps:
	@echo "Instalando dependências..."
	$(NPM) install

# Build completo
build: build-deb build-appimage

# Build DEB
build-deb:
	@echo "Compilando DEB..."
	$(NPM) run build:deb

# Build AppImage
build-appimage:
	@echo "Compilando AppImage..."
	$(NPM) run build:appimage

# Build APK (requer Android SDK)
build-apk:
	@echo "Compilando APK..."
	$(NPM) run build:apk

# Build para desenvolvimento
dev:
	$(NPM) run start

# Limpar build
clean:
	rm -rf dist/
	rm -rf node_modules/
	rm -rf .cache/

# Testes
test:
	$(NPM) test

# Formatar código
format:
	$(NPM) run format

# Linting
lint:
	$(NPM) run lint
