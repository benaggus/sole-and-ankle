import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const TAGS = {
  onsale: {
    '--background-color': COLORS.primary,
    '--color': COLORS.white,
    text: 'Sale',
  },
  newrelease: {
    '--background-color': COLORS.secondary,
    '--color': COLORS.white,
    text: 'Just Released!',
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== 'default' && (
          <Tag style={TAGS[variant.replace('-', '')]}>
            {TAGS[variant.replace('-', '')].text}
          </Tag>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color': variant === 'on-sale' && COLORS.gray[700],
              '--text-decoration': variant === 'on-sale' && 'line-through',
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && (
            <SalePrice>
              <Price>{formatPrice(salePrice)}</Price>
            </SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 9px;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  color: var(--color);
  background-color: var(--background-color);
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
  display: block;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const Price = styled.span`
  display: block;
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: block;
`;

export default ShoeCard;
