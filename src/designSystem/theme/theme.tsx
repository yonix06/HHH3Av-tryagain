import { Inter } from 'next/font/google'

const interFont = Inter({
  subsets: ['latin'],
})

const defaultColors = {
  primary: '#00a1ec',
  error: '#ff4d4f',
  info: '#1677ff',
  success: '#52c41a',
  warning: '#faad14',
  textBase: 'white',
  link: '#005E8A',
  bgBase: 'linear-gradient(to bottom right, rgb(2 8 20), rgb(9 19 48))',
  bgContainer:
    'linear-gradient(to top, rgba(255 255 255 / 0), rgba(87 111 219 / 0.49))',
  border: '#9A9AA7',
  borderSecondary: '#7A7A80',
  split: 'rgba(255, 255, 255, 0.07)',
  menuItemHover: '#1874FF',
  menuItemActive: '#094BD9',
}

export const Theme = (theme: any) => ({
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: theme?.colors?.primary ?? defaultColors.primary,
    colorError: theme?.colors?.error ?? defaultColors.error,
    colorInfo: theme?.colors?.info ?? defaultColors.info,
    colorSuccess: theme?.colors?.success ?? defaultColors.success,
    colorWarning: theme?.colors?.warning ?? defaultColors.warning,
    colorTextBase: theme?.colors?.textBase ?? defaultColors.textBase,
    colorLink: theme?.colors?.link ?? defaultColors.link,
    colorBgBase: theme?.colors?.bgBase ?? defaultColors.bgBase,
    colorBgContainer: theme?.colors?.bgContainer ?? defaultColors.bgContainer,
    backgroundImage: theme?.colors?.bgBase ?? defaultColors.bgBase,
    colorBorder: theme?.colors?.border ?? defaultColors.border,
    colorBorderSecondary:
      theme?.colors?.borderSecondary ?? defaultColors.borderSecondary,
    colorSplit: theme?.colors?.split ?? defaultColors.split,
    colorMenuItemHover:
      theme?.colors?.menuItemHover ?? defaultColors.menuItemHover,
    colorMenuItemActive:
      theme?.colors?.menuItemActive ?? defaultColors.menuItemActive,

    // Typography
    fontFamily:
      theme?.typography?.fontFamily ??
      `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: theme?.typography?.fontSize ?? 14,
    fontSizeHeading1: theme?.typography?.fontSizeHeading1 ?? 38,
    fontSizeHeading2: theme?.typography?.fontSizeHeading2 ?? 30,
    fontSizeHeading3: theme?.typography?.fontSizeHeading3 ?? 24,
    linkDecoration: theme?.typography?.linkDecoration ?? 'underline',

    //Form
    controlItemBgActive: theme?.form?.controlItemBgActive ?? '#27272a',
    controlOutline: theme?.form?.controlOutline ?? 'rgba(255, 255, 255, 0.15)',
    controlHeight: theme?.form?.controlHeight ?? 36,
    controlHeightSM: theme?.form?.controlHeightSM ?? 32,

    // Layout
    padding: theme?.layout?.padding ?? 16,
    boxShadow:
      theme?.layout?.boxShadow ??
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    borderRadius: theme?.layout?.borderRadius ?? 6,
    lineType: theme?.layout?.lineType ?? 'solid',
    lineWidth: theme?.layout?.lineWidth ?? 1,
    motion: theme?.layout?.motion ?? false,
  },
  components: {
    Form: {
      itemMarginBottom: theme?.components?.form?.itemMarginBottom ?? '22px',
    },
    Layout: {
      headerBg: theme?.components?.layout?.headerBg ?? 'black',
      footerBg: theme?.components?.layout?.footerBg ?? 'black',
      bodyBg: theme?.components?.layout?.bodyBg ?? 'black',
      siderBg: theme?.components?.layout?.siderBg ?? '#141414',
    },
    Menu: {
      activeBarBorderWidth: theme?.components?.menu?.activeBarBorderWidth ?? 0,
      itemHeight: theme?.components?.menu?.itemHeight ?? 30,
      horizontalItemSelectedColor:
        theme?.components?.menu?.horizontalItemSelectedColor ?? 'white',
      horizontalItemSelectedBg:
        theme?.components?.menu?.horizontalItemSelectedBg ?? 'transparent',
      itemSelectedColor: theme?.components?.menu?.itemSelectedColor ?? 'white',
      itemSelectedBg: theme?.components?.menu?.itemSelectedBg ?? 'transparent',
      itemActiveBg:
        theme?.components?.menu?.itemActiveBg ?? defaultColors.menuItemActive,
      itemHoverColor: theme?.components?.menu?.itemHoverColor ?? 'white',
      itemHoverBg:
        theme?.components?.menu?.itemHoverBg ?? defaultColors.menuItemHover,
      itemColor: theme?.components?.menu?.itemColor ?? '#909090',
      itemBg: theme?.components?.menu?.itemBg ?? 'transparent',
      iconMarginInlineEnd: theme?.components?.menu?.iconMarginInlineEnd ?? 8,
      iconSize: theme?.components?.menu?.iconSize ?? 16,
      animation: {
        enter: theme?.components?.menu?.animation?.enter ?? '0.3s ease-in-out',
        leave: theme?.components?.menu?.animation?.leave ?? '0.3s ease-in-out',
      },
    },
    Button: {
      paddingInlineSM: theme?.components?.button?.paddingInlineSM ?? 11,
      colorTextLightSolid:
        theme?.components?.button?.colorTextLightSolid ?? 'black',
      primaryColor: theme?.components?.button?.primaryColor ?? 'black',
      fontWeight: theme?.components?.button?.fontWeight ?? 500,
    },
  },
})
