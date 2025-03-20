const SPRITE_WIDTH  = 67;
const SPRITE_HEIGHT = 69;

const BORDER_WIDTH = 2;
const SPACING_WIDTH = 2;

let numRow = 10;
let numColumn = 6;

function spritePositionToImagePosition(row , col)
{
    let obj = {
        x:(
            BORDER_WIDTH + numColumn * ( SPACING_WIDTH + SPRITE_WIDTH ) 
        ),
        y:(
            BORDER_WIDTH + numRow * ( SPACING_WIDTH )
        )
    }
}