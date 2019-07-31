# Maintainer: Please see AUR page for current maintainer and contact information.

pkgname=brave-git
pkgver=0.55.5.r854.g3002f27
pkgrel=1
pkgdesc="A web browser that stops ads and trackers by default. Master branch."
arch=('x86_64') # Upstream supports x86_64 only
url="https://www.brave.com/"
license=('MPL2' 'BSD' 'Apache' 'custom:others')
groups=('networking')
depends=('gtk2' 'nss' 'alsa-lib' 'gconf' 'libxtst' 'libgnome-keyring' 'libxss' 'ttf-font')
makedepends=('git' 'npm')
optdepends=('cups: To print stuff'
            'pepper-flash: Adobe Flash support')
provides=('brave' 'brave-browser')
conflicts=('brave')
source=('brave::git://github.com/brave/brave-browser.git'
        'brave-launcher'
        'brave.desktop'
        'gclient-no-history.diff'
        'build-zip.js')
sha384sums=('SKIP'
            'SKIP'
            'SKIP'
            'SKIP')

packaged_files=('brave'
                'brave_100_percent.pak'
                'brave_200_percent.pak'
                'chrome_100_percent.pak'
                'chrome_200_percent.pak'
                'brave_resources.pak'
                'icudtl.dat'
                'natives_blob.bin'
                'resources.pak'
                'v8_context_snapshot.bin'
                'version'
)

pkgver() {
  cd "$srcdir/brave"
  git describe --tags --long | sed 's/^v//;s/\([^-]*-g\)/r\1/;s/-/./g'
}

prepare() {
  mkdir -p "$srcdir/bin"
  ln -fs "$(which python2)" "$srcdir/bin/python"
  export PATH="$srcdir/bin:$PATH"
  echo $PATH

  cd "$srcdir/brave"

  patch -p1 < "$srcdir/gclient-no-history.diff"

  npm install

  #git submodule update --init --recursive

  npm run init
}



build() {
  export PATH="$srcdir/bin:$PATH"

  cd "$srcdir/brave"

  npx -c "node $srcdir/build-zip.js"
  #npm run create_dist -- Release --debug_build=true --official_build=false
}

package() {
  cd "$srcdir/brave"

  install -d -m0755 "$pkgdir/usr/lib/"

  pushd src/out/Release/dist
  rm -r brave.breakpad.syms chromedriver chromedriver-v*-linux-x64.zip brave-v*-linux-x64.zip
  popd

  cp -a --reflink=auto "src/out/Release/dist" "$pkgdir/usr/lib/$pkgname"

  install -Dm0755 "$srcdir/brave-launcher" "$pkgdir/usr/bin/brave"

  install -Dm0755 "$srcdir/brave.desktop" "$pkgdir/usr/share/applications/$pkgname.desktop"

  for size in 22 24 128 256; do
    install -Dm0644 "src/brave/app/theme/brave/product_logo_$size.png" \
      "$pkgdir/usr/share/icons/hicolor/${size}x${size}/apps/brave.png"
  done

  for size in 16 32; do
    install -Dm644 "src/brave/app/theme/default_100_percent/brave/product_logo_$size.png" \
      "$pkgdir/usr/share/icons/hicolor/${size}x${size}/apps/brave.png"
  done

  install -d -m0755 "$pkgdir/usr/share/licenses/$pkgname/"
  sed -n '0,/the terms of GPL v3/p' LICENSE > "$pkgdir/usr/share/licenses/$pkgname/incorporated-codebases"
  cp -a --reflink=auto src/out/Release/dist/LICENSES.chromium.html "$pkgdir/usr/share/licenses/$pkgname/"
}

# vim:set ts=2 sw=2 et:
