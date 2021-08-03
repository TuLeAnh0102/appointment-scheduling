import React, { useEffect , useState} from 'react';
import styled from 'styled-components';

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';

const CDropdownStyled = styled(CDropdown)`
  text-align: left;
`;
const CDropdownToggleStyled = styled(CDropdownToggle)`
  text-align: left;
  margin-top: 4px;
  color: rgba(3,73,164,1);
  font-family: Roboto;
  font-style: normal;
  border: solid 1px;
`;
export default function DropdownListUser()
{
  return(
    <>
    <CDropdownStyled >
      <CDropdownToggleStyled>
        Chọn từ danh sách
      </CDropdownToggleStyled>
      <CDropdownMenu>
        <CDropdownItem>Action</CDropdownItem>
      </CDropdownMenu>
    </CDropdownStyled>
    </>
  )
}
