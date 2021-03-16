"use strict";

exports.__esModule = true;
exports.useUserFeeds = useUserFeeds;

var _swr = _interopRequireDefault(require("swr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useUserFeeds(id) {
  const {
    data,
    error
  } = (0, _swr.default)(id ? "/user/" + id + "/feeds" : null);
  return {
    feeds: data,
    loading: !error && !data,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXVzZXItZmVlZHMudHMiXSwibmFtZXMiOlsidXNlVXNlckZlZWRzIiwiaWQiLCJkYXRhIiwiZXJyb3IiLCJmZWVkcyIsImxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFLTyxTQUFTQSxZQUFULENBQ0xDLEVBREssRUFFcUM7QUFDMUMsUUFBTTtBQUFFQyxJQUFBQSxJQUFGO0FBQVFDLElBQUFBO0FBQVIsTUFBa0Isa0JBQU9GLEVBQUUsY0FBWUEsRUFBWixjQUF5QixJQUFsQyxDQUF4QjtBQUVBLFNBQU87QUFDTEcsSUFBQUEsS0FBSyxFQUFFRixJQURGO0FBRUxHLElBQUFBLE9BQU8sRUFBRSxDQUFDRixLQUFELElBQVUsQ0FBQ0QsSUFGZjtBQUdMQyxJQUFBQTtBQUhLLEdBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VTV1IgZnJvbSBcInN3clwiO1xuaW1wb3J0IHsgVXNlckNvbnRlbnRGZWVkcyB9IGZyb20gXCJAZ2F0c2J5LXR2L3R5cGVzXCI7XG5cbmltcG9ydCB7IEZldGNoUmVzcG9uc2UgfSBmcm9tIFwiQGxpYi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXNlckZlZWRzKFxuICBpZD86IHN0cmluZ1xuKTogRmV0Y2hSZXNwb25zZTxcImZlZWRzXCIsIFVzZXJDb250ZW50RmVlZHM+IHtcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gdXNlU1dSKGlkID8gYC91c2VyLyR7aWR9L2ZlZWRzYCA6IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZmVlZHM6IGRhdGEsXG4gICAgbG9hZGluZzogIWVycm9yICYmICFkYXRhLFxuICAgIGVycm9yLFxuICB9O1xufVxuIl19