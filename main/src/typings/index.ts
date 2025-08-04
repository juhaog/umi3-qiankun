/**
 * @name 菜单项
 */
export interface MenuItem {
  id?: string;
  code?: string;
  /**@name 菜单路径 */
  path: string;
  /**@name 菜单名称 */
  name: string;
  /**@name 菜单跳转路径 */
  target?: string;
  /**@name 菜单图标 */
  icon?: string | null;
  /**@name 菜单组件 */
  component?: string | null;
  /**@name 权限配置 */
  authority?: string[];
  /**@name 菜单列表(配置) */
  routes?: MenuItem[];
  /**@name 子菜单列表 */
  children?: MenuItem[] | null;
  /**@name 是否在菜单中隐藏 */
  hideInMenu?: boolean;
  /**@name 是否在tab中隐藏 */
  hideInTab?: boolean;
  /**@name 是否多开标签页 */
  multiple?: boolean;
  /**@name 是否缓存标签页 */
  keepAlive?: boolean;
  /**@name 是否在面包屑中隐藏 */
  upperId?: string;
}