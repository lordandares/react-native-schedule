
npm install -g appcenter-cli

& appcenter login --token dc6b3a218e53b900af71a643ace353f156436aab

& appcenter test run xcuitest --app "jordan14petersen/Next"  --devices "0f2bb2ea" --test-series "master" --locale "en_US" --build-dir "DerivedData/Build/Products/Release-iphoneos" --token dc6b3a218e53b900af71a643ace353f156436aab
#& appcenter test run xcuitest --app "miked-02/Temp" --devices "e3ebcf49" --test-series "master" --locale "en_US" --build-dir "C:\Temp\nexttest\drop\Build\Products\Debug-iphoneos" --token dc6b3a218e53b900af71a643ace353f156436aab


