'use client';

import AddToCartButton from '@/domains/products/components/AddToCartButton';
import RestockAlertButton from '@/domains/products/components/RestockAlertButton';
import type { Product } from '@/domains/products/types/product.types';
import { formatPrice } from '@/shared/utils/formatPrice';
import { Minus, Package, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 가격 · 수량 · 장바구니/바로 구매
export default function ProductPurchasePanel({
    product,
}: {
    product: Product;
}) {
    const router = useRouter();
    const soldOut = product.stock === 0;
    const [qty, setQty] = useState(1);

    const changeQty = (next: number) =>
        setQty(Math.min(Math.max(1, next), Math.max(1, product.stock)));

    const handleBuyNow = () => {
        // 구매는 회원 전용 → 로그인 페이지로 보내고, 로그인 후 이 상세로 돌아오게 callbackUrl 을 남겨요.
        // TODO: 로그인 상태면 주문서로 바로 이동 (인증 작업과 연결)
        const callbackUrl = encodeURIComponent(`/${product.id}`);
        router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
    };

    return (
        <div className="border-ub-line border-t pt-6">
            <p className="font-ub-serif text-[26px] font-medium">
                {formatPrice(product.price)}
            </p>

            <div className="border-ub-line text-ub-sub mt-4 mb-5 flex items-center justify-between gap-3 border-b pb-4 text-xs">
                <span>
                    배송비 3,000원 · 30,000원 이상 무료 ·{' '}
                    {soldOut ? '일시 품절' : `재고 ${product.stock}권`}
                </span>
                <div className="border-ub-border inline-flex h-[38px] shrink-0 items-center rounded-full border">
                    <button
                        type="button"
                        aria-label="수량 빼기"
                        onClick={() => changeQty(qty - 1)}
                        disabled={soldOut || qty <= 1}
                        className="text-ub-ink grid h-full w-[38px] place-items-center disabled:opacity-30"
                    >
                        <Minus className="h-3.5 w-3.5" />
                    </button>
                    <output
                        aria-live="polite"
                        className="text-ub-ink w-9 text-center text-[13px]"
                    >
                        {qty}
                    </output>
                    <button
                        type="button"
                        aria-label="수량 더하기"
                        onClick={() => changeQty(qty + 1)}
                        disabled={soldOut || qty >= product.stock}
                        className="text-ub-ink grid h-full w-[38px] place-items-center disabled:opacity-30"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {soldOut ? (
                <RestockAlertButton
                    productId={product.id}
                    variant="full"
                    className="w-full"
                />
            ) : (
                <div className="grid grid-cols-2 gap-2.5">
                    <AddToCartButton
                        productId={product.id}
                        title={product.title}
                        quantity={qty}
                        variant="full"
                    />
                    <button
                        type="button"
                        onClick={handleBuyNow}
                        className="bg-ub-olive hover:bg-ub-olive-dark h-12 rounded-full text-sm font-bold text-white transition-colors"
                    >
                        바로 구매하기
                    </button>
                </div>
            )}

            <p className="text-ub-muted mt-3 flex items-center gap-1 text-[11px]">
                <Package className="h-3 w-3" aria-hidden="true" />
                어은동 책방에서 직접 포장해 보내드려요. 2–3일 안에 출발해요.
            </p>
        </div>
    );
}
