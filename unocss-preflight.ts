export const basePreflight = `
    *,
    ::before,
    ::after {
        @media screen and (max-width: 1024px) {
            .rank .ranklabel {
                font-size: 1.125rem; /* 18px */
                line-height: 1.75rem; /* 28px */
                flex-shrink: 1;
                padding-left: 0;
                padding-right: 0;
            }
            .rank .rankvalue {
                flex-shrink: 1;
                padding-left: 0;
                padding-right: 0;
            }
            .rank .levelnumber {
                font-size: 1.125rem; /* 18px */
                line-height: 1.75rem; /* 28px */
                flex-shrink: 1;
                padding-left: 0;
                padding-right: 0;
            }
            .rank .levelprogress {
                flex-shrink: 1;
                padding-left: 0;
                padding-right: 0;
            }
            .rank {
                font-size: 1.125rem; /* 18px */
                line-height: 1.75rem; /* 28px */
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-content: center;
                align-items: center;
                padding-left: 0;
                padding-right: 0;
                gap: 0.5rem; /* 8px */
                width: fit-content;
            }
        }

        @media screen and (min-width: 768px) {
            .ranklabel {
                display: none;
            }
            .menu-divider {
                display: inherit;
                position: relative;
                padding: 0;
                margin: 0;
            }
        }

        @media screen and (max-width: 768px) {
            .menu-divider {
                display: none;
            }
        }

        sl-avatar {
            --size: 5rem;
        }

        profilelink {
            position: absolute;
            right: 2rem;
            top: 50%;
            vertical-align: middle;
        } 
        profilelink sl-tooltip, 
        profilelink sl-tooltip a {
            vertical-align: middle;
        }

        .progressbar {
            --height: 24px;
        }

        .progressbar::part(label) {
            font-weight: bolder;
            font-size: 1rem;
            text-align: center;
        }   
    }`;