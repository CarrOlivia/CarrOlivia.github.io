let wkeys = [];
let bkeys = [];
let gap = [2, 6, 9, 13, 16, 20, 23, 27];
let wcol = [];
let bcol = [];
var clicked;
var up;
var freq;
var key;
let keywave = [];
var change;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    var c = 0;
    var s = 0;
    for (i = 0; i < 13; i++)
    {
        s = 0;
        for (j = 0; j < 8; j++)
        {
            if (i == gap[j])
            {
                c = j + 1;
                s = 1;
            }
        }
        wkeys[i] = 21 - 2 * (i - c) - c - s;
    }
    c = 0;
    for (i = 13; i < 28; i++)
    {
        for (j = 3; j < 8; j++)
        {
            if (i == gap[j] + 1)
            {
                c = j - 2;
            }
        }
        wkeys[i] = 2 * (i - 12) - c;
    }
    var k = -1;
    var e = 0;
    for (i = 0; i < 28; i++)
    {
        k++;
        for (j = 0; j < 7; j++)
        {
            if (i == gap[j])
            {
                i++;
            }
        }
        if (k > 8)
        {
            e = 2;
        }
        if (k < 20)
        {
            bkeys[k] = (wkeys[i] - 1) + e;
        }
    }
    for (i = 0; i < 28; i++)
    {
        wcol[i] = 255;
    }
    for (i = 0; i < 20; i++)
    {
        bcol[i] = 0;
    }
}

function draw() {
    background("lightskyblue");
    for (i = 0; i < 28; i++)
    {
        rectMode(CORNER);
        fill("white");
        if (wcol[i] != 255)
        {
            fill(200);
        }
        rect(width / 28 * i, (height / 4), (width / 28), (height / 2));
    }
    k = -1;
    for (i = 0; i < 28; i++)
    {
        k++
        for (j = 0; j < 8; j++)
        {
            if (i == gap[j])
            {
                i++;
            }
        }
        rectMode(CENTER);
        fill("black");
        if (bcol[k] != 0)
        {
            fill(75);
        }
        rect(width / 28 * (i + 1), (height / 8 * 3), (width / (28 * 1.5)), (height / 4));
    }
}

function mousePressed() {
    up = 0;
    if (mouseY > (height / 4) && mouseY < height * 3 / 4)
    {
        for (i = 0; i < 28; i++)
        {
            if (mouseX > width / 28 * i && mouseX < width / 28 * (i + 1))
            {
                clicked = i;
            }
        }
        k = -1;
        if (Math.abs(height / 8 * 3 - mouseY) < height / 8)
        {
            for (i = 0; i < 28; i++)
            {
                k++;
                for (j = 0; j < 8; j++)
                {
                    if (i == gap[j])
                    {
                        i++;
                    }
                }
                if (Math.abs(width / 28 * (i + 1) - mouseX) < width / (28 * 3))
                {
                    up = 1;
                    clicked = k;
                }
            }
        }
        if (up == 0)
        {
            if (clicked < 13)
            {
                freq = round(pow(2, (-1 * wkeys[clicked] / 12.0)) * 440);
            }
            else if (clicked > 12)
            {
                freq = round(pow(2, (wkeys[clicked] / 12.0)) * 440);
            }
            wcol[clicked] = 200;
        }
        else if (up == 1)
        {
            if (clicked < 9)
            {
                freq = round(pow(2, (-1 * bkeys[clicked] / 12.0)) * 440);
            }
            if (clicked > 8)
            {
                freq = round(pow(2, (bkeys[clicked] / 12.0)) * 440);
            }
            bcol[clicked] = 75;
        }
        mousewave = new p5.Oscillator();
        mousewave.setType('sine');
        mousewave.start();
        mousewave.amp(1);
        mousewave.freq(freq);
    }
}

function mouseReleased()
{
    mousewave.stop();
    if (up == 0)
    {
        wcol[clicked] = 255;
    }
    else if (up == 1)
    {
        bcol[clicked] = 0;
    }
}

function keyPressed()
{
    up = 0;
    key = keynumber(keyCode);
    if (key > 28 || key < 0)
    {
        return;
    }
    up = pressblack(key);
    if (up == 0)
    {
        wcol[key] = 200;
        if (key < 13)
        {
            freq = round(pow(2, (-1 * wkeys[key] / 12.0)) * 440);
        }
        else if (key > 12)
        {
            freq = round(pow(2, (wkeys[key] / 12.0)) * 440);
        }
    }
    if (up == 1)
    {
        change = whiteblackchange(key);
        bcol[key - change] = 75;
        if (key < 13)
        {
            freq = round(pow(2, (-1 * (wkeys[key] - 1) / 12.0)) * 440);
        }
        else if (key > 12)
        {
            freq = round(pow(2, ((wkeys[key] + 1)/ 12.0)) * 440);
        }
    }
    keywave[key * 2 + up] = new p5.Oscillator();
    keywave[key * 2 + up].setType('sine');
    keywave[key * 2 + up].start();
    keywave[key * 2 + up].amp(1);
    keywave[key * 2 + up].freq(freq);
}

function keyReleased()
{
    key = keynumber(keyCode);
    if (key > 28 || key < 0)
    {
        return;
    }
    up = pressblack(key);
    keywave[key * 2 + up].stop();
    if (up == 0)
    {
        wcol[key] = 255;
    }
    else if (up == 1)
    {
        change = whiteblackchange(key);
        bcol[key - change] = 0;
    }
}

function keynumber(codenumber)
{
    key = 30;
    let oct4 = [81, 87, 69, 82, 84, 89, 85];
    let oct5 = [65, 83, 68, 70, 71, 72, 74];
    let oct6 = [90, 88, 67, 86, 66, 78, 77];
    var oct = 0;
    var note = 0;
    for (o = 49; o <= 55; o++)
    {
        if (codenumber === o)
        {
            oct = 3;
            note = o - 49;
        }
    }
    for (o = 0; o < 7; o++)
    {
        if (codenumber === oct4[o])
        {
            oct = 4;
            note = o;
        }
    }
    for (o = 0; o < 7; o++)
    {
        if (codenumber === oct5[o])
        {
            oct = 5;
            note = o;
        }
    }
    for (o = 0; o < 7; o++)
    {
        if (codenumber === oct6[o])
        {
            oct = 6;
            note = o;
        }
    }
    key = note + 7 * (oct - 3);
    return key;
}

function pressblack(key)
{
    up = 0;
    var count = 0;
    for (j = 0; j < 8; j++)
    {
        if (keyIsDown(SHIFT) && key != gap[j])
        {
            count++
        }
    }
    if (count == 8)
    {
        up = 1;
    }
    return up;
}

function whiteblackchange(key)
{
    change = 0;
    for (j = 0; j < 8; j++)
    {
        if (key < gap[j + 1] && key > gap[j])
        {
            change = j + 1;
            return change;
        }
    }
    return change;
}