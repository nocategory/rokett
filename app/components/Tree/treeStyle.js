export default {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'inherit',
      margin: 0,
      padding: '12.5px',
      color: '#FFF',
      fontFamily: 'rubikregular',
      fontSize: '1.25em',
      width: '100%'
    },
    node: {
      base: {
        position: 'relative',
        cursor: 'pointer',
        margin: 0,
        padding: '2.8px 0 2.8px 10.5px',
        userSelect: 'none'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '1.5px 7px',
        display: 'block',
        whiteSpace: 'nowrap'
      },
      activeLink: {
        background: 'rgba(144, 144, 144, 0.2)',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'middle',
          marginLeft: '0px',
          height: '16px',
          width: '16px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-10px 0 0 -7px',
          height: '11px'
        },
        height: 9,
        width: 9,
        arrow: {
          fill: '#FFF',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#FFF',
          opacity: '0.8'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '25px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};
