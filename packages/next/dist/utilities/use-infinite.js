"use strict";

require("core-js/modules/es.array.flat.js");

require("core-js/modules/es.array.unscopables.flat.js");

exports.__esModule = true;
exports.useInfinite = useInfinite;

var _react = require("react");

var _swr = require("swr");

function useInfinite(getKey) {
  const {
    data,
    error,
    size,
    setSize
  } = (0, _swr.useSWRInfinite)(getKey);
  const generator = (0, _react.useCallback)(() => setSize(current => current + 1), [setSize]);
  const loading = !data && !error || size > 0 && data && typeof data[size - 1] === "undefined";
  return {
    data: data == null ? void 0 : data.flat(),
    loading,
    generator,
    error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLWluZmluaXRlLnRzIl0sIm5hbWVzIjpbInVzZUluZmluaXRlIiwiZ2V0S2V5IiwiZGF0YSIsImVycm9yIiwic2l6ZSIsInNldFNpemUiLCJnZW5lcmF0b3IiLCJjdXJyZW50IiwibG9hZGluZyIsImZsYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUlPLFNBQVNBLFdBQVQsQ0FDTEMsTUFESyxFQUU2QjtBQUNsQyxRQUFNO0FBQUVDLElBQUFBLElBQUY7QUFBUUMsSUFBQUEsS0FBUjtBQUFlQyxJQUFBQSxJQUFmO0FBQXFCQyxJQUFBQTtBQUFyQixNQUFpQyx5QkFBa0JKLE1BQWxCLENBQXZDO0FBRUEsUUFBTUssU0FBUyxHQUFHLHdCQUFZLE1BQU1ELE9BQU8sQ0FBRUUsT0FBRCxJQUFhQSxPQUFPLEdBQUcsQ0FBeEIsQ0FBekIsRUFBcUQsQ0FDckVGLE9BRHFFLENBQXJELENBQWxCO0FBSUEsUUFBTUcsT0FBTyxHQUNWLENBQUNOLElBQUQsSUFBUyxDQUFDQyxLQUFYLElBQ0NDLElBQUksR0FBRyxDQUFQLElBQVlGLElBQVosSUFBb0IsT0FBT0EsSUFBSSxDQUFDRSxJQUFJLEdBQUcsQ0FBUixDQUFYLEtBQTBCLFdBRmpEO0FBSUEsU0FBTztBQUNMRixJQUFBQSxJQUFJLEVBQUVBLElBQUYsb0JBQUVBLElBQUksQ0FBRU8sSUFBTixFQUREO0FBRUxELElBQUFBLE9BRks7QUFHTEYsSUFBQUEsU0FISztBQUlMSCxJQUFBQTtBQUpLLEdBQVA7QUFNRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTV1JJbmZpbml0ZSB9IGZyb20gXCJzd3JcIjtcblxuaW1wb3J0IHsgSW5maW5pdGVGZXRjaFJlc3BvbnNlIH0gZnJvbSBcIkBsaWIvdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUluZmluaXRlPFQ+KFxuICBnZXRLZXk6IChpbmRleDogbnVtYmVyKSA9PiBzdHJpbmcgfCBudWxsXG4pOiBJbmZpbml0ZUZldGNoUmVzcG9uc2U8XCJkYXRhXCIsIFQ+IHtcbiAgY29uc3QgeyBkYXRhLCBlcnJvciwgc2l6ZSwgc2V0U2l6ZSB9ID0gdXNlU1dSSW5maW5pdGU8VD4oZ2V0S2V5KTtcblxuICBjb25zdCBnZW5lcmF0b3IgPSB1c2VDYWxsYmFjaygoKSA9PiBzZXRTaXplKChjdXJyZW50KSA9PiBjdXJyZW50ICsgMSksIFtcbiAgICBzZXRTaXplLFxuICBdKTtcblxuICBjb25zdCBsb2FkaW5nID1cbiAgICAoIWRhdGEgJiYgIWVycm9yKSB8fFxuICAgIChzaXplID4gMCAmJiBkYXRhICYmIHR5cGVvZiBkYXRhW3NpemUgLSAxXSA9PT0gXCJ1bmRlZmluZWRcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBkYXRhPy5mbGF0KCkgYXMgVFtdIHwgdW5kZWZpbmVkLFxuICAgIGxvYWRpbmcsXG4gICAgZ2VuZXJhdG9yLFxuICAgIGVycm9yLFxuICB9O1xufVxuIl19