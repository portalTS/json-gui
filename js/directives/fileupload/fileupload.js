directives.directive('fileupload', function($timeout, Upload) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/fileupload/fileupload.html',
        replace: true,
        scope: {
            parameter:"=",
            dependencies:"=",
        },
        link:function(scope,elm,attr) {
            var num =scope.parameter.dbName;
            /**************** VALIDATION ******************/
            var dependencies = scope.dependencies;
            scope.validationFunction = new Function("return function v(parameter, dependencies){var isValid = {valid:true, message:''};"+scope.parameter.isValid+" return isValid;}")();
            scope.fileuploadValid = function(){
                if(typeof(scope.parameter.value)=="undefined" || scope.parameter.value.length<scope.parameter.minUpload) {
                    scope.parameter.message = "Upload at least "+scope.parameter.minUpload;
                    scope.parameter.message+= (scope.parameter.minUpload==1)? " file" : " files";
                    return false;
                }
                return true;
            }
            /**************** EVALUATION ******************/
            scope.parameter.evaluate = function(){
                scope.parameter.message ="";
                var validation = scope.validationFunction(scope.parameter, scope.dependencies);
                if(!scope.fileuploadValid()){
                    return false;
                }

                if(!validation.valid){
                    scope.parameter.message = validation.message;
                    return false;
                }
                scope.parameter.message = "";
                return true;
            }



            scope.initFileReader = function (){
                if (window.File && window.FileList && window.FileReader) {
                    scope.init();
                }
            }
            // initialize
            scope.init = function() {
                scope.maxLengthByte = calculateLength(scope.parameter.maxSize);
                var form = $("#"+scope.parameter.dbName);
                var fileselect =  form.find("#fileselect")[0],
                    filedrag =  form.find("#filedrag")[0],
                    submitbutton =  form.find("#submitbutton")[0];
                //                scope.modal = form.find("#modal");

                // file select
                fileselect.addEventListener("change", scope.fileSelectHandler, false);

                // is XHR2 available?
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {

                    // file drop
                    filedrag.addEventListener("dragover", scope.fileDragHover, false);
                    filedrag.addEventListener("dragleave", scope.fileDragHover, false);
                    filedrag.addEventListener("drop", scope.fileSelectHandler, false);
                    filedrag.style.display = "block";

                    // remove submit button
                    submitbutton.style.display = "none";
                }
            }

            scope.fileDragHover = function(e) {
                e.stopPropagation();
                e.preventDefault();
                e.target.className = (e.type == "dragover" ? "hover" : "");
            }


            scope.parseFile = function(file) {
                if(file.size>scope.maxLengthByte) {
                    errorUpload("The file named "+file.name+" is too big. The maximum dimension accepted is "+scope.parameter.maxSize+".");
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(e) {
                    console.log(e.target.result);
                    $timeout(function(){scope.parameter.value.push(e.target.result);});
                };
                reader.readAsDataURL(file);
                $timeout(function() {
                    scope.uploadedFilesDescription.push(file);
                    console.log(scope.uploadedFilesDescription);
                });


            }

            scope.fileSelectHandler = function(e) {
                scope.fileDragHover(e);
                var files = e.target.files || e.dataTransfer.files;
                if(scope.uploadedFilesDescription.length+files.length>scope.parameter.maxUpload){
                    errorUpload("Reached maximum file uploads allowed ("+scope.parameter.maxUpload+").");
                    return;
                }

                for (var i = 0, f; f = files[i]; i++) {
                    scope.parseFile(f);
                }

            }


            scope.openInput = function(){
                $('#'+scope.parameter.dbName).find('#fileselect').click();
            }
            var calculateLength = function(length){
                length = length.toLowerCase();
                var retLength = parseInt(length);
                if(length.indexOf("kb")>0)
                    return retLength*1000;
                if(length.indexOf("mb")>0)
                    return retLength*1000000;
                if(length.indexOf("gb")>0)
                    return retLength*1000000000;
                return retLength;
            }
            //            scope.openModal = function(message){
            //                console.log(scope.modal[0]);
            //                scope.modal.find(".modal-body").text(message);
            //                console.log(scope.modal.find(".modal-body").text());
            //                scope.modal.modal('show');
            //                console.log("show");
            //            }

            var errorUpload = function(message) {
                $timeout(function(){scope.errorUpload.splice(0, 0,message);});

                $timeout(function(){scope.errorUpload.splice(0,1)},5000);
            }
            scope.errorUpload = [];
            scope.uploadedFilesDescription = [];
            $timeout(function(){
                scope.initFileReader();
            });
        }
    }



});
