pyftsubset "BenchNine-Bold.ttf" --output-file="BenchNine-Bold-kern-latin.woff2" --flavor=woff2 --layout-features=ccmp,locl,mark,mkmk,kern --no-hinting --desubroutinize --unicodes=U+20,U+45,U+61,U+63,U+65,U+67,U+69,U+6C-70,U+72-74,U+76,U+79

# npm install datauri-cli -g
datauri BenchNine-Bold-kern-latin.woff2 --copy