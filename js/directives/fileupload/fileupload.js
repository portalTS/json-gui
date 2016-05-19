directives.directive('fileupload', function($timeout, Upload) {
  return {
    restrict: 'E',
    templateUrl: 'fileupload/fileupload.html',
    replace: true,
    require: '^jsonInput',
    scope: {
      parameter:"=",
      dependencies:"=",
    },
    link:function(scope, elm, attr, jsonInputCtrl) {
      var num = scope.parameter.dbName;
      /**************** VALIDATION ******************/
      scope.fileuploadValid = function(){
        if(typeof(scope.parameter.value)=="undefined" || scope.parameter.value.length<scope.parameter.minUpload) {
          var msg = "Upload at least "+scope.parameter.minUpload;
          msg+= (scope.parameter.minUpload==1)? " file" : " files";
          scope.parameter.message.push(msg);
          return false;
        }
        return true;
      }
      /**************** EVALUATION ******************/

      scope.message = [];
      jsonInputCtrl.isValid = scope.parameter.isValid;
      scope.validationFunction = jsonInputCtrl.validationFunction;

      scope.parameter.evaluate = function() {
        scope.parameter.message = [];
        var a = jsonInputCtrl.evaluate(scope.parameter, scope.dependencies);
        for(var i=0; i<a.message.length;i++)
        scope.parameter.message.push(a.message[i]);
        var valid =  scope.fileuploadValid();
        valid =  a.isValid && valid;
        scope.isParameterValid = valid;
        return valid;
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
        var fileselect =  form.find("#fileselect")[0];
        var filedrag =  form.find("#filedrag")[0];
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
        }
      }

      scope.fileDragHover = function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
      }


      scope.parseFile = function(file) {
        if(!scope.fileHasAllowedExtension(file)){
          errorUpload("This extension is not allowed. Allowed extensions are: "+scope.parameter.allowedExtensions);
          return;
        }
        if(file.size>scope.maxLengthByte) {
          errorUpload("The file named "+file.name+" is too big. The maximum dimension accepted is "+scope.parameter.maxSize+".");
          return;
        }
        if(fileAlreadyUploaded(file.name)){
          errorUpload("You already uploaded a file with name "+file.name+".");
          return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var paramFile = {fileName: file.name, data: e.target.result};
          $timeout(function(){scope.parameter.value.push(paramFile)});
        };
        reader.readAsDataURL(file);
        $timeout(function() {
          scope.uploadedFilesDescription.push(file);

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
        $timeout(function(){
          if(scope.parameter.disabled) return;
          $('#'+scope.parameter.dbName).find('#fileselect').click();
        }, 0);
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
        $timeout(function(){scope.errorUpload.splice(0, 0, message);});
        $timeout(function(){scope.errorUpload.splice(0,1)},5000);
      }

      scope.removeFile = function(index){
        scope.parameter.value.splice(index, 1);
        scope.uploadedFilesDescription.splice(index, 1);
      }

      scope.fileHasAllowedExtension = function(file){
        var exts = scope.parameter.allowedExtensions;
        if(typeof(exts)=='undefined') return true;
        if(typeof(exts)=='string' && exts!="") return file.name.endsWith('.'+exts);
        if(Array.isArray(exts)){
          for(var i=0;i<exts.length;i++)
          if(file.name.endsWith('.'+exts[i]))
          return true;
          return false;
        }

        return true;
      }
      var fileAlreadyUploaded = function(fileName){
        for(var i=0;i<scope.parameter.value.length;i++)
          if(scope.parameter.value[i].fileName.localeCompare(fileName)==0) return true;
        return false;
      }

      scope.errorUpload = [];
      scope.uploadedFilesDescription = [];
      $timeout(function(){
        if(scope.parameter.disabled) return;
        scope.initFileReader();
      });
    }
  }



});
