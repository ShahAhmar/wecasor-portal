<?php

namespace App\Filament\Resources\DataApprovals\Pages;

use App\Filament\Resources\DataApprovals\DataApprovalResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDataApprovals extends ManageRecords
{
    protected static string $resource = DataApprovalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
