var droppedID = 0;
var lastClickedButton;

$(document).ready(function () {

    $(function () {
        $(".draggable").draggable();
    });

    $('.drag-stage-el').draggable({
        //revert: "invalid",
        //stack: ".draggable",
        helper: 'clone'
    });

    $('.editor-stage').droppable({
        accept: ".drag-stage-el",
        drop: function (event, ui) {
            var dropped = $(ui.helper).clone();
            dropped.appendTo($(this));
            $(dropped).removeClass("drag-stage-el");

            //create new id to dropped element
            droppedID = droppedID + 1;
            $(dropped).attr('id', `dropped_${droppedID}`)

            //fixing style after element dropped
            $(dropped).addClass("btn-after-drop");
            console.log("ui.offset", ui.offset);
            var droppedPositionTop = ui.offset.top - 90;
            var droppedPositionLeft = ui.offset.left - 5;
            $(dropped).css("top", droppedPositionTop);
            $(dropped).css("left", droppedPositionLeft);

            //while making the dropped element draggble, do this:
            $(dropped).draggable({
                //draggable element craete for the first time
                create: findeLastClickedID,
                //draggable element start dragging
                start: findeLastClickedID
            });
        }
    });

    //find the last clicked button id
    function findeLastClickedID(event) {
        lastClickedButton = event.target.id;

        var droppedBtns = $(".last-clicked-btn-border");
        for (var droppedBtn of droppedBtns) {
            $(droppedBtn).removeClass("last-clicked-btn-border")
        }
        //add focus style to the last clicked button
        $(`#${lastClickedButton}`).addClass("last-clicked-btn-border")

    }

    //on keyboard up
    $(document).keyup(function () {

        var key = event.keyCode || event.charCode;
        if (key == 8 || key == 46) {
            //delete the last clicked dropped button
            $(`#${lastClickedButton}`).remove()
        }
    })

    $('#panelBtn').click(function () {
        $("#side-panel").removeClass("hideBlock");
    });

    $('#side-panel-close-btn').click(function () {
        $("#side-panel").addClass("hideBlock");
    });

    $('.panel-acc-btn-btns').click(function () {
        $("#button-card").removeClass("hideBlock");
        $("#side-panel").addClass("hideBlock");
    });


    $('#sidePanel-store').click(function () {
        $("#store-card").removeClass("hideBlock");
        $("#side-panel").addClass("hideBlock");
    });

    $('.btn-close').click(function () {
        var cardToClose = $(this).parent().parent().parent().attr('id')
        $("#" + cardToClose).addClass("hideBlock");
    });

    $('#card-store-openAcc').click(function () {
        $('#store-elementsGallery').animate({ scrollTop: 200 })
    });

});

