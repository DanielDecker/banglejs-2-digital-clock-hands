;(function () {
  let two_pi = Math.PI * 2;
  let pi_half = Math.PI / 2;

  function drawRotDigit(poly_i, cos_a, sin_a, param) {
    let poly_rot = [];

    // Rotate every point of the digit
    for (let j=0; j<poly_i.length; j+=2) {
      var x = poly_i[j];
      var y = poly_i[j+1];
      poly_i[j] = (x * cos_a + y * sin_a) + param.cx;
      poly_i[j+1] = (-x * sin_a + y * cos_a) + param.cy;
    }

    g.fillPoly(poly_i);
  }


  function drawClockHand(hours, minutes, outerRadius, font_size, param) {
    // Calculate transformation rotation
    let rotation;
    if ( hours == -1 )
      rotation = two_pi * (15 - minutes) / 60;
    else
      rotation = two_pi * (3 - hours - minutes / 60) / 12;

    // Set font to get accuarte result for stringWidth
    g.setFont('Vector', font_size);
    // no hours => minute hand
    let digits = (hours === -1 ? minutes : hours);
    let separator = ':';
    let str_width = g.stringWidth(separator + digits);

    // Build clock hand
    let right_side = ( rotation < pi_half && rotation > -pi_half );
    // For right hand side clock hand use forward text, e. g. 24:24>
    // For left hand side clock hand use backward text, e. g. <24:24
    let text = (right_side ? ('' + digits) : ('<' + digits));
    for (let i=(str_width*2); i<=outerRadius; i+=str_width)
      text += separator + digits;

    let x_offset, x_off_rect;
    if ( right_side ) {
      text += '>';
      x_offset = x_off_rect= -8;
    } else {
      x_offset = -g.stringWidth(text) + 8;
      x_off_rect = x_offset +12;
      rotation -= Math.PI;
    }
    // apply half font hight offset, to fix rotation axis
    var poly = g.getVectorFontPolys(text, {x:x_offset, y:-font_size/2, w:font_size, h:font_size});

    let cos_a = Math.cos(rotation);
    let sin_a = Math.sin(rotation);

    // draw background rect
    g.setColor(param.cfg.Background === 'Theme' ? g.theme.bg : param.cfg.Background || '#FFFFFF');
    let rect_top = -font_size/3 * 1.3;
    let rect_bottom = font_size/3* 0.9;
    let rect_length = g.stringWidth(text) - 12;
    bg_rect = [x_off_rect, rect_top,
               x_off_rect + rect_length, rect_top,
               x_off_rect + rect_length, rect_bottom,
               x_off_rect, rect_bottom];
    drawRotDigit(bg_rect, cos_a, sin_a, param);

    // draw clock hands with foreground color
    g.setColor(param.cfg.Foreground === 'Theme' ? g.theme.fg : param.cfg.Foreground || '#000000');
    for (let i=0; i<poly.length; i++)
      drawRotDigit(poly[i], cos_a, sin_a, param);
  }

  exports.draw = function draw (
      Settings, CenterX, CenterY, outerRadius, Hours, Minutes, Seconds
    ) {
    let param = {
      cx : CenterX,
      cy : CenterY,
      cfg : Settings
    };

    drawClockHand(-1, Minutes, outerRadius * 0.9, 16, param);
    drawClockHand(Hours, Minutes, outerRadius * 0.65, 20, param);

  };
})();

