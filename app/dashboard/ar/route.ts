import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Option 1: Inline HTML
  const htmlContent = `
    <!doctype html>
    <html>
      <head>
        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js"></script>
        <script src="https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js"></script>
      </head>

      <body style="margin: 0; overflow: hidden">
        <a-scene
          vr-mode-ui="enabled: false;"
          loading-screen="enabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
          id="scene"
          embedded
          gesture-detector
        >
          <a-assets>
            <a-asset-item id="animated-asset" src="/assets/asset.glb"></a-asset-item>
          </a-assets>

          <a-marker
            id="animated-marker"
            type="pattern"
            preset="custom"
            url="/assets/marker.patt"
            raycaster="objects: .clickable"
            emitevents="true"
            cursor="fuse: false; rayOrigin: mouse;"
            id="markerA"
          >
            <a-entity
              id="bowser-model"
              scale="0.0044742729306487695 0.0044742729306487695 0.0044742729306487695"
              animation-mixer="loop: repeat"
              gltf-model="#animated-asset"
              class="clickable"
              gesture-handler
            ></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      </body>
    </html>
  `;

  // Option 2: Reading from a static file (recommended for larger HTML files)
  // import fs from 'fs/promises';
  // const htmlContent = await fs.readFile(process.cwd() + '/static/page.html', 'utf-8');

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
