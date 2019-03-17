import Modeler from 'bpmn-js/lib/Modeler';
import BpmnInt from './bpmnInt';
var xml2js = require('xml2js');
import $ from 'jquery';

import PropertiesPanel from './properties-panel';

import customModdleExtension from './moddle/custom.json';

import initialDiagram from './diagram.bpmn';
var xml = initialDiagram;

var builder = new xml2js.Builder();

console.log(BpmnInt.bpmnInt()); 
console.log(xml);
xml2js.parseString(xml, function (err, result) {
  console.log(JSON.stringify(result));
  
  xml = builder.buildObject(result);
});
console.log(xml);


import nyanDrawModule from './lib/nyan/draw';
import nyanPaletteModule from './lib/nyan/palette';

const $modelerContainer = document.querySelector('#modeler-container');
const $propertiesContainer = document.querySelector('#properties-container');

const modeler = new Modeler({
  container: $modelerContainer, 
  //additionalModules: [ nyanPaletteModule, nyanDrawModule ], 
  moddleExtensions: {
   custom: customModdleExtension
  },
  keyboard: {
    bindTo: document.body
  }
});

const propertiesPanel = new PropertiesPanel({
  container: $propertiesContainer,
  modeler
});
modeler.importXML(xml);

var downloadLink = $('#js-download-diagram');
$('.buttons a').click(function(e) {
  if (!$(this).is('.active')) {
    e.preventDefault();
    e.stopPropagation();
  }
});

var exportArtifacts = debounce(function() {
  saveDiagram(function(err, xml) {
    setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
  });
}, 500); 

function saveDiagram(done) {
  // https://github.com/bpmn-io/bpmn-js/blob/31177b94e79221e50db95272a08f8c9688a635aa/lib/Viewer.js#L238
  modeler.saveXML({ format: true }, function(err, xml) {
    done(err, xml);
  });
}

modeler.on('commandStack.changed', exportArtifacts);

// helpers //////////////////////

function debounce(fn, timeout) {

  var timer;

  return function() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(fn, timeout);
  };
}

function setEncoded(link, name, data) {
  var encodedData = encodeURIComponent(data);

  if (data) {
    link.addClass('active').attr({
      'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
      'download': name
    });
  } else {
    link.removeClass('active');
  }
}