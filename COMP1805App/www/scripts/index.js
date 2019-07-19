// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        /*
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

        //Listen for PDF Viewer button click event
        document.getElementById("singleView").addEventListener("click", viewSinglePdf);        
        document.getElementById("leftView").addEventListener("click", viewLeftPdf);
        document.getElementById("rightView").addEventListener("click", viewRightPdf);

        pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';

        /*
        //PSPDFKIT trial
        var document = new PdfDocument;

        try {
            // Use this Uri format to access files inside your app's assets.
            var documentUri = new Uri;
            documentUri = Uri.parse("test.pdf");

            // This synchronously opens the document. To keep your app UI responsive, you should do this call
            // on a background thread, or use the asynchronous version of this method instead.
            document = PdfDocumentLoder.openDocument(context, documentUri);
        } catch (IOException e) {
            handleDocumentLoadingError(e);
        }

        final int pageIndex = 0;
        // Page size is in PDF points (not pixels).
        final Size pageSize = document.getPageSize(pageIndex);
        // We define a target width for the resulting bitmap and use it to calculate the final height.
        final int width = 2048;
        final int height = (int)(pageSize.height * (width / pageSize.width));

        // This will render the first page uniformly into a bitmap with a width of 2,048 pixels.
        final Bitmap pageBitmap = document.renderPageToBitmap(context, pageIndex, width, height);


        /*PSPDFKit.showDocumentFromAssets("www/documents/test.pdf", {
            title: "My PDF Document",
            page: 0,
            scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
            scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
            useImmersiveMode: true
        });*/

    };

    
    //View single PDF
    function viewSinglePdf() {

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function () {
                var typedarray = new Uint8Array(this.result);

                var thePDF = null;
                var scale = 1;

                //Displaying PDF
                pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                    thePDF = pdf;
                    var viewer = document.getElementById('pdf-viewer');

                    for (var page = 1; page <= pdf.numPages; page++) {
                        var canvas = document.createElement("canvas");
                        canvas.className = 'pdf-page-canvas';
                        viewer.appendChild(canvas);
                        renderPage(page, canvas);
                    }
                });

                //Render page
                function renderPage(pageNumber, canvas) {
                    thePDF.getPage(pageNumber).then(function (page) {
                        var viewport = page.getViewport(scale);
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
                    });
                };
            };

            fileReader.readAsArrayBuffer(file);
        }  
    };

    //View left PDF
    function viewLeftPdf() {

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input-left").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function () {
                var typedarray = new Uint8Array(this.result);

                var thePDF = null;
                var scale = 1;

                //Displaying PDF
                pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                    thePDF = pdf;
                    var viewer = document.getElementById('pdf-left');

                    for (var page = 1; page <= pdf.numPages; page++) {
                        var canvas = document.createElement("canvas");
                        canvas.className = 'pdf-page-canvas';
                        viewer.appendChild(canvas);
                        renderPage(page, canvas);
                    }
                });

                //Render page
                function renderPage(pageNumber, canvas) {
                    thePDF.getPage(pageNumber).then(function (page) {
                        var viewport = page.getViewport(scale);
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
                    });
                };
            };

            fileReader.readAsArrayBuffer(file);
        }
    };

    //View right PDF
    function viewRightPdf() {

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input-right").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function () {
                var typedarray = new Uint8Array(this.result);

                var thePDF = null;
                var scale = 1;

                //Displaying PDF
                pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                    thePDF = pdf;
                    var viewer = document.getElementById('pdf-right');

                    for (var page = 1; page <= pdf.numPages; page++) {
                        var canvas = document.createElement("canvas");
                        canvas.className = 'pdf-page-canvas';
                        viewer.appendChild(canvas);
                        renderPage(page, canvas);
                    }
                });

                //Render page
                function renderPage(pageNumber, canvas) {
                    thePDF.getPage(pageNumber).then(function (page) {
                        var viewport = page.getViewport(scale);
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
                    });
                };
            };

            fileReader.readAsArrayBuffer(file);
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();