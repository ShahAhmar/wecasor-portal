<?php

namespace App\Filament\Resources\AbstractSubmissions\Pages;

use App\Filament\Resources\AbstractSubmissions\AbstractSubmissionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAbstractSubmissions extends ListRecords
{
    protected static string $resource = AbstractSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
