/**
 * 本地存储工具类
 * 封装 localStorage 操作，提供统一的存储接口
 * 支持对象的自动序列化和反序列化
 */
export default {
  /**
   * 存储数据到本地存储
   * @param key 存储的键名
   * @param value 要存储的值（支持任意类型，会自动转换为 JSON 字符串）
   */
  set(key: string, value: any) {
    // 将值转换为 JSON 字符串存储，支持对象、数组等复杂类型
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 从本地存储获取数据
   * @param key 要获取的键名
   * @param defaultValue 默认值（当前参数未使用，建议移除或修复）
   * @returns 返回解析后的数据，如果不存在则返回空字符串
   */
  get(key: string, defaultValue?: any) {
    // 从 localStorage 获取原始字符串
    const vobj = localStorage.getItem(key);

    // 如果不存在该键，返回空字符串
    if (!vobj) {
      return ''
    }

    try {
      // 尝试解析 JSON 字符串
      return JSON.parse(vobj);
    } catch(e) {
      // 如果解析失败（可能是普通字符串），直接返回原始值
      return vobj
    }
  },

  /**
   * 从本地存储中删除指定键的数据
   * @param key 要删除的键名
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有本地存储数据
   * 注意：这会删除整个域名下的所有 localStorage 数据
   */
  clear() {
    localStorage.clear();
  }
}
