window.BinaryManager = function (buffer) {
  this.dataview = new DataView(buffer);
  this.offset = 0;
  this.isLittleEndian = true;
};

window.BinaryManager.prototype = {
  readQuaternion: function () {
    return {
      x: this.readFloat(),
      y: this.readFloat(),
      z: this.readFloat(),
      w: this.readFloat()
    };
  },
  readVector3: function () {
    return {
      x: this.readFloat(),
      y: this.readFloat(),
      z: this.readFloat()
    };
  },
  readString: function () {
    var length = this.dataview.getUint8(this.offset++, true);
    var output = '';
    for (var i = 0; i < length; i++) {
      output += String.fromCharCode(this.dataview.getUint8(this.offset++, true));
    }
    return output;
  },
  readColor: function () {
    return {
      r: this.readFloat(),
      g: this.readFloat(),
      b: this.readFloat()
    };
  },
  readFloat: function () {
    var output = this.dataview.getFloat32(this.offset, true);
    this.offset += 4;
    return output;
  },
  readUint32: function () {
    var output = this.dataview.getUint32(this.offset, true);
    this.offset += 4;
    return output;
  },
  readUint16: function () {
    var output = this.dataview.getUint16(this.offset, true);
    this.offset += 2;
    return output;
  },
  readUint8: function () {
    var output = this.dataview.getUint8(this.offset, true);
    this.offset++;
    return output;
  },
  getDataView: function () {
    return this.dataview;
  }
};
