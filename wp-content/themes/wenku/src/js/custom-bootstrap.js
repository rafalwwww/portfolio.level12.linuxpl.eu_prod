import '@popperjs/core';
import { Modal, Tooltip } from 'bootstrap';

$('body').tooltip({
    selector: '[data-bs-toggle="tooltip"]',
    trigger: 'hover',
    container: 'body'
}).on('click mousedown mouseup tap touchstart touchend touchmove focus blur', '[data-bs-toggle="tooltip"]', function () {    
    $('[data-bs-toggle="tooltip"]').tooltip("hide");
}); 
