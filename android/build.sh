#!/usr/bin/env bash
# Golker Browser - Build Script for Android

echo "==========================================="
echo "  Golker Browser - Android Build Script"
echo "==========================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java not found. Please install JDK 17+"
    exit 1
fi

# Check if Android SDK is installed
if [ -z "$ANDROID_HOME" ]; then
    echo "Error: ANDROID_HOME not set. Please install Android SDK and set ANDROID_HOME"
    exit 1
fi

echo "Java: $(java -version 2>&1 | head -1)"
echo "Android SDK: $ANDROID_HOME"

# Install SDK if needed
if [ ! -d "$ANDROID_HOME/platforms/android-21" ]; then
    echo "Installing Android SDK Platform 21..."
    yes | "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "platforms;android-21" "build-tools;21.0.1" || true
fi

# Build
echo "Building APK..."
./gradlew assembleDebug

# Check result
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "==========================================="
    echo "  Build successful!"
    echo "  APK: app/build/outputs/apk/debug/app-debug.apk"
    echo "==========================================="
else
    echo "Build failed!"
    exit 1
fi
