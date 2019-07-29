// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    var singleView = null;
    var leftView = null;
    var rightView = null;

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
    };

    
    //View single PDF
    function viewSinglePdf() {
        var el = document.getElementById("pdfCenter");
        if (el !== null) {
            el.remove();
        }

        el = document.getElementById("pdfLeft");
        if (el !== null) {
            el.remove();
        }

        el = document.getElementById("pdfRight");
        if (el !== null) {
            el.remove();
        }
        //Create container
        var pdfCenter = document.createElement("pdfCenter");
        pdfCenter.id = "pdfCenter";
        pdfCenter.style.width = "100%";
        pdfCenter.style.height = "100%";
        pdfCenter.style.position = "absolute";

        document.body.appendChild(pdfCenter);

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function () {
                if (singleView !== null) {
                    PSPDFKit.unload(singleView);
                    singleview = null;
                }
                if (leftView !== null) {
                    PSPDFKit.unload(leftView);
                    leftView = null;
                }
                if (rightView != null) {
                    PSPDFKit.unload(rightView);
                    rightView = null;
                }

                PSPDFKit.load({
                    container: pdfCenter,
                    pdf: this.result,
                    licenseKey: "WM8jN50JgP0ymdTPY_dPRHuXjArwjM3CMH00jb27MIce11B6gT6i5wop01lmO4E6Xht55yRQqE3_c_xqGhkuB9rjbAHPY7FVwu7MQzaQ1r_q3X-4MCeX1SzMEnxcL0Vo_mg01lnosg11_DCNjntg_IoF8JiZNKnbdwdR01fmJN--pvAKPkbXExEOw51lw9ONfN9Auk7bto-GkV3sdbuy0yCLyZdzwyGcs9HMafl40eM9GH7VLbDd_4OQoc4WkynyaSZUFZ3hiCzSCcsql2W2DTFXz2L2vEGKZuA0WkWACQrM3n6w3suK2CLP-MS0U0UaxycKHHl_EVh_ui17qjUbp-ImNMT6UmJwOu8eQ30yAWzDLZgX2sxDljYHmttLvE_8dgogkjy7IapycYDLnhkMe3jja7noMTQXKPvC0U6Q9N1WHtj5S_Mpdd95y2G1iyNh",
                    printMode: PSPDFKit.PrintMode.EXPORT_PDF
                })
                    .then(function (instance) {
                        singleView = instance;
                        instance.totalPageCount; // => 10

                        const viewState = instance.viewState;
                        viewState.currentPageIndex; // => 0
                        instance.setViewState(viewState.set("currentPageIndex", 0));
                    })
                    .catch(function (error) {
                        console.error(error.message);
                    });
                /*
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
                */
            };

            fileReader.readAsArrayBuffer(file);
        }  
    };

    //View left PDF
    function viewLeftPdf() {
        var el = document.getElementById("pdfCenter");
        if (el !== null) {
            el.remove();
        }

        el = document.getElementById("pdfLeft");
        if (el !== null) {
            el.remove();
        }
        //Create container
        var pdfLeft = document.createElement("pdfLeft");
        pdfLeft.id = "pdfLeft";
        pdfLeft.style.width = "50%";
        pdfLeft.style.height = "100%";
        pdfLeft.style.left = "0";
        pdfLeft.style.position = "fixed";

        document.body.appendChild(pdfLeft);

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input-left").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();


            fileReader.onload = function () {
                if (leftView !== null) {
                    PSPDFKit.unload(leftView);
                    leftView = null;
                }

                if (singleView !== null) {
                    PSPDFKit.unload(singleView);
                    singleView = null;
                }

                PSPDFKit.load({
                    container: pdfLeft,
                    pdf: this.result,
                    licenseKey: "WM8jN50JgP0ymdTPY_dPRHuXjArwjM3CMH00jb27MIce11B6gT6i5wop01lmO4E6Xht55yRQqE3_c_xqGhkuB9rjbAHPY7FVwu7MQzaQ1r_q3X-4MCeX1SzMEnxcL0Vo_mg01lnosg11_DCNjntg_IoF8JiZNKnbdwdR01fmJN--pvAKPkbXExEOw51lw9ONfN9Auk7bto-GkV3sdbuy0yCLyZdzwyGcs9HMafl40eM9GH7VLbDd_4OQoc4WkynyaSZUFZ3hiCzSCcsql2W2DTFXz2L2vEGKZuA0WkWACQrM3n6w3suK2CLP-MS0U0UaxycKHHl_EVh_ui17qjUbp-ImNMT6UmJwOu8eQ30yAWzDLZgX2sxDljYHmttLvE_8dgogkjy7IapycYDLnhkMe3jja7noMTQXKPvC0U6Q9N1WHtj5S_Mpdd95y2G1iyNh",
                    printMode: PSPDFKit.PrintMode.EXPORT_PDF
                })
                    .then(function (instance) {
                        leftView = instance;
                        instance.totalPageCount; // => 10

                        const viewState = instance.viewState;
                        viewState.currentPageIndex; // => 0
                        instance.setViewState(viewState.set("currentPageIndex", 0));
                    })
                    .catch(function (error) {
                        console.error(error.message);
                    });
                /*
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
                */
            };

            fileReader.readAsArrayBuffer(file);
        }  
    };

    //View right PDF
    function viewRightPdf() {
        var el = document.getElementById("pdfCenter");
        if (el !== null) {
            el.remove();
        }

        el = document.getElementById("pdfRight");
        if (el !== null) {
            el.remove();
        }
        //Create container
        var pdfRight = document.createElement("pdfRight");
        pdfRight.id = "pdfRight";
        pdfRight.style.width = "50%";
        pdfRight.style.height = "100%";
        pdfRight.style.right = "0";
        pdfRight.style.position = "fixed";

        document.body.appendChild(pdfRight);

        //Waiting for file to be chosen in browse dialog box
        document.getElementById("file-input-right").onchange = function (event) {

            var file = event.target.files[0];

            var fileReader = new FileReader();

            fileReader.onload = function () {
                if (rightView !== null) {
                    PSPDFKit.unload(rightView);
                    rightView = null;
                }

                if (singleView !== null) {
                    PSPDFKit.unload(singleView);
                    singleView = null;
                }
                PSPDFKit.load({
                    container: pdfRight,
                    pdf: this.result,
                    licenseKey: "WM8jN50JgP0ymdTPY_dPRHuXjArwjM3CMH00jb27MIce11B6gT6i5wop01lmO4E6Xht55yRQqE3_c_xqGhkuB9rjbAHPY7FVwu7MQzaQ1r_q3X-4MCeX1SzMEnxcL0Vo_mg01lnosg11_DCNjntg_IoF8JiZNKnbdwdR01fmJN--pvAKPkbXExEOw51lw9ONfN9Auk7bto-GkV3sdbuy0yCLyZdzwyGcs9HMafl40eM9GH7VLbDd_4OQoc4WkynyaSZUFZ3hiCzSCcsql2W2DTFXz2L2vEGKZuA0WkWACQrM3n6w3suK2CLP-MS0U0UaxycKHHl_EVh_ui17qjUbp-ImNMT6UmJwOu8eQ30yAWzDLZgX2sxDljYHmttLvE_8dgogkjy7IapycYDLnhkMe3jja7noMTQXKPvC0U6Q9N1WHtj5S_Mpdd95y2G1iyNh"
                })
                    .then(function (instance) {
                        instance.totalPageCount; // => 10

                        const viewState = instance.viewState;
                        viewState.currentPageIndex; // => 0
                        instance.setViewState(viewState.set("currentPageIndex", 0));
                    })
                    .catch(function (error) {
                        console.error(error.message);
                    });
                /*
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
                */
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