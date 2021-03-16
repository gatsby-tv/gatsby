"use strict";

exports.__esModule = true;
exports.useFeaturedChannels = useFeaturedChannels;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFeaturedChannels() {
  const {
    data,
    error
  } = (0, _swr.default)("/listing/featured/channels");
  return {
    channels: data,
    loading: !data && !error,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLWZlYXR1cmVkLWNoYW5uZWxzLnRzIl0sIm5hbWVzIjpbInVzZUZlYXR1cmVkQ2hhbm5lbHMiLCJkYXRhIiwiZXJyb3IiLCJjaGFubmVscyIsImxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFLTyxTQUFTQSxtQkFBVCxHQUFxRTtBQUMxRSxRQUFNO0FBQUVDLElBQUFBLElBQUY7QUFBUUMsSUFBQUE7QUFBUixNQUFrQixrQkFBTyw0QkFBUCxDQUF4QjtBQUVBLFNBQU87QUFDTEMsSUFBQUEsUUFBUSxFQUFFRixJQURMO0FBRUxHLElBQUFBLE9BQU8sRUFBRSxDQUFDSCxJQUFELElBQVMsQ0FBQ0MsS0FGZDtBQUdMQSxJQUFBQTtBQUhLLEdBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VTV1IgZnJvbSBcInN3clwiO1xuaW1wb3J0IHsgQ2hhbm5lbCB9IGZyb20gXCJAZ2F0c2J5LXR2L3R5cGVzXCI7XG5cbmltcG9ydCB7IEZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmVhdHVyZWRDaGFubmVscygpOiBGZXRjaFJlc3BvbnNlPFwiY2hhbm5lbHNcIiwgQ2hhbm5lbFtdPiB7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHVzZVNXUihcIi9saXN0aW5nL2ZlYXR1cmVkL2NoYW5uZWxzXCIpO1xuXG4gIHJldHVybiB7XG4gICAgY2hhbm5lbHM6IGRhdGEsXG4gICAgbG9hZGluZzogIWRhdGEgJiYgIWVycm9yLFxuICAgIGVycm9yLFxuICB9O1xufVxuIl19