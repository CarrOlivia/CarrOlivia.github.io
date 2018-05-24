let wkeys = [];
let bkeys = [];
let gap = [2, 6, 9, 13, 16, 20, 23, 27];

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
}

function draw() {
    background("lightskyblue");
    for (i = 0; i < 28; i++)
    {
        rectMode(CORNER);
        fill("white");
        rect(width / 28 * i, (height / 4), (width / 28), (height / 2));
    }
    for (i = 0; i < 28; i++)
    {
        for (j = 0; j < 8; j++)
        {
            if (i == gap[j])
            {
                i++;
            }
        }
        rectMode(CENTER);
        fill("black");
        rect(width / 28 * (i + 1), (height / 8 * 3), (width / (28 * 1.5)), (height / 4));
    }
}

function mousePressed() {
    var clicked = 0;
    var up = 0;
    var freq = 0;
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
        console.log(clicked);
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
        }
        console.log(freq);
        wave = new p5.Oscillator();
        wave.setType('sine');
        wave.start();
        wave.amp(1);
        wave.freq(freq);
    }
}

function mouseReleased()
{
    wave.stop();
}