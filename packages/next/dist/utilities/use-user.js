"use strict";

exports.__esModule = true;
exports.useUser = useUser;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useUser(unique) {
  const {
    data,
    error
  } = (0, _swr.default)(unique ? "/user/" + unique : null);
  return {
    user: data,
    loading: !error && !data,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXVzZXIudHMiXSwibmFtZXMiOlsidXNlVXNlciIsInVuaXF1ZSIsImRhdGEiLCJlcnJvciIsInVzZXIiLCJsb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBS08sU0FBU0EsT0FBVCxDQUFpQkMsTUFBakIsRUFBK0Q7QUFDcEUsUUFBTTtBQUFFQyxJQUFBQSxJQUFGO0FBQVFDLElBQUFBO0FBQVIsTUFBa0Isa0JBQU9GLE1BQU0sY0FBWUEsTUFBWixHQUF1QixJQUFwQyxDQUF4QjtBQUVBLFNBQU87QUFDTEcsSUFBQUEsSUFBSSxFQUFFRixJQUREO0FBRUxHLElBQUFBLE9BQU8sRUFBRSxDQUFDRixLQUFELElBQVUsQ0FBQ0QsSUFGZjtBQUdMQyxJQUFBQTtBQUhLLEdBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VTV1IgZnJvbSBcInN3clwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAZ2F0c2J5LXR2L3R5cGVzXCI7XG5cbmltcG9ydCB7IEZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXNlcih1bmlxdWU/OiBzdHJpbmcpOiBGZXRjaFJlc3BvbnNlPFwidXNlclwiLCBVc2VyPiB7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHVzZVNXUih1bmlxdWUgPyBgL3VzZXIvJHt1bmlxdWV9YCA6IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgdXNlcjogZGF0YSxcbiAgICBsb2FkaW5nOiAhZXJyb3IgJiYgIWRhdGEsXG4gICAgZXJyb3IsXG4gIH07XG59XG4iXX0=